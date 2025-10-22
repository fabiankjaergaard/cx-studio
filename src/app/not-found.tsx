'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { HomeIcon, ArrowLeftIcon, SearchIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <img
            src="/Kustra-logo.png"
            alt="Kustra"
            className="h-24 w-auto mx-auto mb-8"
          />
          <h1 className="text-9xl font-bold text-slate-700 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" className="flex items-center gap-2">
              <HomeIcon className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Go Back
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/journey-maps" className="text-sm text-slate-600 hover:text-slate-700 hover:underline">
              Journey Maps
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/templates" className="text-sm text-slate-600 hover:text-slate-700 hover:underline">
              Templates
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/personas" className="text-sm text-slate-600 hover:text-slate-700 hover:underline">
              Personas
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/insights" className="text-sm text-slate-600 hover:text-slate-700 hover:underline">
              Insights
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
