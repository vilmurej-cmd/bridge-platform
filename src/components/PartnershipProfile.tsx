'use client';

import Link from 'next/link';
import { Calendar, Clock, ListChecks, Share2, Bookmark } from 'lucide-react';
import type { BridgeProfile } from '@/lib/demo-profile';
import ScoreCircle from './ScoreCircle';
import SessionRoadmap from './SessionRoadmap';

interface PartnershipProfileProps {
  profile: BridgeProfile;
  strengths: string[];
}

export default function PartnershipProfile({
  profile,
  strengths,
}: PartnershipProfileProps) {
  const handleSave = () => {
    // In a real app, persist to backend
    alert('Profile saved!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: profile.partnershipName,
        text: profile.dreamSummary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Partnership name */}
      <div className="text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-bridge-gold to-bridge-gold-dark bg-clip-text text-transparent leading-tight">
          {profile.partnershipName}
        </h1>
        <p className="mt-4 text-secondary italic text-lg leading-relaxed max-w-2xl mx-auto">
          {profile.dreamSummary}
        </p>
      </div>

      {/* Two columns: You Bring / AI Partner Brings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* You Bring */}
        <div className="bg-white rounded-3xl p-8 border border-border">
          <h2 className="font-serif text-xl font-semibold text-primary mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-bridge-gold" />
            You Bring
          </h2>
          <div className="flex flex-wrap gap-2">
            {strengths.map((s) => (
              <span
                key={s}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-bridge-gold-dark bg-gold-soft border border-bridge-gold/20 rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* AI Partner Brings */}
        <div className="bg-white rounded-3xl p-8 border border-border">
          <h2 className="font-serif text-xl font-semibold text-primary mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-bridge-violet" />
            Your AI Partner Brings
          </h2>
          <p className="text-sm text-secondary mb-3">
            <span className="font-semibold text-primary">Role:</span>{' '}
            {profile.partnerProfile.aiRole}
          </p>
          <p className="text-sm text-secondary mb-3">
            <span className="font-semibold text-primary">Personality:</span>{' '}
            {profile.partnerProfile.aiPersonality}
          </p>
          <p className="text-sm text-secondary">
            <span className="font-semibold text-primary">Complement:</span>{' '}
            {profile.partnerProfile.strengthComplement}
          </p>
        </div>
      </div>

      {/* Session Roadmap */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-primary mb-6 text-center">
          Your First 3 Sessions
        </h2>
        <SessionRoadmap sessions={profile.firstThreeSessions} />
      </div>

      {/* Session Plan card */}
      <div className="bg-white rounded-3xl p-8 border border-border">
        <h2 className="font-serif text-xl font-semibold text-primary mb-5">
          Session Plan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <Calendar size={18} className="text-bridge-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted uppercase tracking-wide font-medium">
                Frequency
              </p>
              <p className="text-sm text-primary font-medium mt-0.5">
                {profile.sessionPlan.frequency}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={18} className="text-bridge-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted uppercase tracking-wide font-medium">
                Session Length
              </p>
              <p className="text-sm text-primary font-medium mt-0.5">
                {profile.sessionPlan.sessionLength}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ListChecks size={18} className="text-bridge-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted uppercase tracking-wide font-medium">
                Format
              </p>
              <p className="text-sm text-primary font-medium mt-0.5">
                {profile.sessionPlan.format}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Scores */}
      <div className="text-center">
        <h2 className="font-serif text-2xl font-bold text-primary mb-8">
          Partnership Score
        </h2>
        <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
          <ScoreCircle
            score={profile.partnershipScore.readiness}
            label="Readiness"
          />
          <ScoreCircle
            score={profile.partnershipScore.complementarity}
            label="Complementarity"
          />
          <ScoreCircle
            score={profile.partnershipScore.dreamClarity}
            label="Dream Clarity"
          />
          <ScoreCircle
            score={profile.partnershipScore.overall}
            label="Overall"
            color="#8B5CF6"
          />
        </div>
      </div>

      {/* Motivational message */}
      <div className="bg-white rounded-3xl p-8 border-l-4 border-l-bridge-gold border border-border">
        <p className="text-secondary leading-relaxed italic">
          {profile.motivationalMessage}
        </p>
      </div>

      {/* Bottom CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href="/getting-started"
          className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-bridge-gold hover:bg-bridge-gold-dark rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Start Building Now
        </Link>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-secondary hover:text-bridge-gold border border-border hover:border-bridge-gold/30 rounded-full transition-all duration-200"
        >
          <Bookmark size={16} />
          Save My Profile
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-secondary hover:text-bridge-gold border border-border hover:border-bridge-gold/30 rounded-full transition-all duration-200"
        >
          <Share2 size={16} />
          Share
        </button>
      </div>
    </div>
  );
}
