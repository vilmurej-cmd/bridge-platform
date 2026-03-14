'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PartnershipProfile from '@/components/PartnershipProfile';
import { decodeProfile } from '@/lib/share';

function ProfileContent() {
  const searchParams = useSearchParams();
  const encoded = searchParams.get('p');

  if (!encoded) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
          No Profile Found
        </h1>
        <p className="text-secondary text-lg mb-8 max-w-md">
          This page displays a shared partnership profile. It looks like the
          link is missing the profile data.
        </p>
        <Link
          href="/assess"
          className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Create Your Own Profile
          <span className="ml-2" aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    );
  }

  const profile = decodeProfile(encoded);

  if (!profile) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
          Invalid Profile Link
        </h1>
        <p className="text-secondary text-lg mb-8 max-w-md">
          This profile link appears to be invalid or corrupted. Try asking the
          person who shared it to send a new link.
        </p>
        <Link
          href="/assess"
          className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Create Your Own Profile
          <span className="ml-2" aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    );
  }

  // Extract strength names from the dream summary context (fallback to empty)
  const strengths: string[] = [];

  return (
    <div className="py-12 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm text-muted mb-8 uppercase tracking-wide font-medium">
          Shared Partnership Profile
        </p>

        <PartnershipProfile profile={profile} strengths={strengths} />

        <div className="mt-20 text-center">
          <p className="text-secondary text-lg mb-6">
            Inspired? Create your own partnership profile.
          </p>
          <Link
            href="/assess"
            className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Create Your Own Profile
            <span className="ml-2" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-bridge-gold border-t-transparent animate-spin" />
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
