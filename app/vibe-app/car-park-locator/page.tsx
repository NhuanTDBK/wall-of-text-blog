'use client'

import { useState, useCallback } from 'react'

interface GpsCoords {
  lat: number
  lng: number
  accuracy: number
}

interface SavedSpot {
  gps: GpsCoords | null
  floor: string
  zone: string
  slot: string
  savedAt: string
}

const FLOORS = ['B3', 'B2', 'B1', 'G', '1', '2', '3', '4', '5']
const ZONES = ['A', 'B', 'C', 'D', 'E', 'F']

export default function CarParkLocator() {
  const [gps, setGps] = useState<GpsCoords | null>(null)
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [gpsError, setGpsError] = useState('')
  const [floor, setFloor] = useState('B1')
  const [zone, setZone] = useState('A')
  const [slot, setSlot] = useState('')
  const [savedSpot, setSavedSpot] = useState<SavedSpot | null>(null)
  const [saved, setSaved] = useState(false)

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGpsStatus('error')
      setGpsError('Geolocation is not supported by your browser.')
      return
    }
    setGpsStatus('loading')
    setGpsError('')
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
        setGpsError(err.message || 'Unable to retrieve location.')
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [])

  const saveSpot = useCallback(() => {
    const now = new Date()
    const savedAt = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setSavedSpot({ gps, floor, zone, slot, savedAt })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }, [gps, floor, zone, slot])

  const clearSpot = useCallback(() => {
    setSavedSpot(null)
    setGps(null)
    setGpsStatus('idle')
    setGpsError('')
    setSlot('')
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-50 px-4 py-10 dark:bg-gray-950">
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
              <div className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm dark:bg-green-900/20">
                <p className="font-mono text-green-700 dark:text-green-400">
                  {gps.lat.toFixed(6)}, {gps.lng.toFixed(6)}
                </p>
                <p className="mt-0.5 text-xs text-green-600 dark:text-green-500">
                  Accuracy: ±{gps.accuracy}m
                </p>
              </div>
            )}

            {gpsStatus === 'error' && (
              <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                ⚠️ {gpsError}
              </div>
            )}
          </div>

          {/* Manual Input Section */}
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
              {savedSpot.gps ? (
                <p className="mt-1 font-mono text-xs text-gray-500 dark:text-gray-400">
                  GPS: {savedSpot.gps.lat.toFixed(6)}, {savedSpot.gps.lng.toFixed(6)}
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
