'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Leaflet map to avoid SSR issues
const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false })

interface GpsCoords {
  lat: number
  lng: number
  accuracy: number
}

interface SavedSpot {
  gps: GpsCoords | null
  address: string | null
  floor: string
  zone: string
  slot: string
  savedAt: string
}

const FLOORS = ['B3', 'B2', 'B1', 'G', '1', '2', '3', '4', '5']
const ZONES = ['A', 'B', 'C', 'D', 'E', 'F']

async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    { headers: { 'Accept-Language': 'en', 'User-Agent': 'CarParkLocator/1.0' } }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.display_name ?? null
}

export default function CarParkLocator() {
  const [gps, setGps] = useState<GpsCoords | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [addressLoading, setAddressLoading] = useState(false)
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [gpsError, setGpsError] = useState('')
  const [floor, setFloor] = useState('B1')
  const [zone, setZone] = useState('A')
  const [slot, setSlot] = useState('')
  const [savedSpot, setSavedSpot] = useState<SavedSpot | null>(null)
  const [saved, setSaved] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!gps) return
    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl
    setAddressLoading(true)
    reverseGeocode(gps.lat, gps.lng)
      .then((addr) => {
        if (!ctrl.signal.aborted) setAddress(addr)
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setAddressLoading(false)
      })
  }, [gps])

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGpsStatus('error')
      setGpsError('Geolocation is not supported by your browser.')
      return
    }
    setGpsStatus('loading')
    setGpsError('')
    setAddress(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: Math.round(pos.coords.accuracy),
        })
        setGpsStatus('success')
      },
      (err) => {
        setGpsStatus('error')
        const messages: Record<number, string> = {
          1: 'Location permission denied. Please allow location access in your browser settings.',
          2: 'Position unavailable. Try moving to an open area with better GPS signal, then retry.',
          3: 'Location request timed out. Please retry.',
        }
        setGpsError(messages[err.code] ?? err.message ?? 'Unable to retrieve location.')
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 30000 }
    )
  }, [])

  const saveSpot = useCallback(() => {
    const now = new Date()
    const savedAt = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setSavedSpot({ gps, address, floor, zone, slot, savedAt })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }, [gps, address, floor, zone, slot])

  const clearSpot = useCallback(() => {
    abortRef.current?.abort()
    setSavedSpot(null)
    setGps(null)
    setAddress(null)
    setGpsStatus('idle')
    setGpsError('')
    setSlot('')
  }, [])

  return (
    <div
      className="flex min-h-dvh flex-col items-center justify-start bg-gray-50 px-4 pt-10 pb-10 dark:bg-gray-950"
      style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-lg dark:bg-gray-900">
        {/* Header */}
        <div className="rounded-t-2xl bg-blue-600 px-6 py-5 text-white dark:bg-blue-700">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🅿️</span>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Car Park Locator</h1>
              <p className="text-sm text-blue-100">Remember where you parked</p>
            </div>
          </div>
        </div>

        <div className="space-y-5 px-6 py-6">
          {/* GPS Section */}
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <p className="mb-3 text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
              GPS Location
            </p>
            <button
              onClick={getLocation}
              disabled={gpsStatus === 'loading'}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {gpsStatus === 'loading' ? '📡 Getting location…' : '📍 Get My Location'}
            </button>

            {gpsStatus === 'success' && gps && (
              <div className="mt-3 space-y-2">
                <div className="rounded-lg bg-green-50 px-3 py-2 text-sm dark:bg-green-900/20">
                  <p className="font-mono text-green-700 dark:text-green-400">
                    {gps.lat.toFixed(6)}, {gps.lng.toFixed(6)}
                  </p>
                  <p className="mt-0.5 text-xs text-green-600 dark:text-green-500">
                    Accuracy: ±{gps.accuracy}m
                  </p>
                  {addressLoading && (
                    <p className="mt-1.5 text-xs text-green-500 dark:text-green-600">
                      Resolving address…
                    </p>
                  )}
                  {address && (
                    <p className="mt-1.5 text-xs text-green-700 dark:text-green-400">
                      📍 {address}
                    </p>
                  )}
                </div>

                {/* Interactive OpenStreetMap */}
                <div className="h-56 w-full overflow-hidden rounded-xl">
                  <LeafletMap lat={gps.lat} lng={gps.lng} address={address} />
                </div>
              </div>
            )}

            {gpsStatus === 'error' && (
              <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm dark:bg-red-900/20">
                <p className="text-red-600 dark:text-red-400">⚠️ {gpsError}</p>
                <button
                  onClick={getLocation}
                  className="mt-2 text-xs font-medium text-red-600 underline hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          {/* Parking Details */}
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <p className="mb-3 text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
              Parking Details
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label
                  htmlFor="select-floor"
                  className="w-12 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Floor
                </label>
                <select
                  id="select-floor"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  {FLOORS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="select-zone"
                  className="w-12 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Zone
                </label>
                <select
                  id="select-zone"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  {ZONES.map((z) => (
                    <option key={z} value={z}>
                      Zone {z}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="input-slot"
                  className="w-12 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Slot
                </label>
                <input
                  id="input-slot"
                  type="text"
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  placeholder="e.g. C14 (optional)"
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={saveSpot}
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            {saved ? '✅ Saved!' : '💾 Save My Parking Spot'}
          </button>

          {/* Saved Summary */}
          {savedSpot && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:text-emerald-400">
                  Saved Spot
                </p>
                <button
                  onClick={clearSpot}
                  className="text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  Clear
                </button>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                Floor {savedSpot.floor} · Zone {savedSpot.zone}
                {savedSpot.slot && ` · #${savedSpot.slot}`}
              </p>
              {savedSpot.address && (
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                  📍 {savedSpot.address}
                </p>
              )}
              {savedSpot.gps ? (
                <p className="mt-1 font-mono text-xs text-gray-400 dark:text-gray-500">
                  {savedSpot.gps.lat.toFixed(6)}, {savedSpot.gps.lng.toFixed(6)}
                </p>
              ) : (
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">GPS not captured</p>
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Saved at {savedSpot.savedAt}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
