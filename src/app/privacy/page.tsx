import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — BRIDGE',
  description:
    'BRIDGE privacy policy. Plain language, no legalese. Learn what we collect, how we use it, and what we never do.',
};

export default function PrivacyPage() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
          Privacy Policy
        </h1>
        <p className="text-muted text-sm mb-12">Last updated: March 2026</p>

        <div className="prose-bridge space-y-10">
          {/* Intro */}
          <div>
            <p className="text-secondary leading-relaxed">
              We believe privacy policies should be readable by humans, not
              just lawyers. Here&apos;s what you need to know about how BRIDGE
              handles your data.
            </p>
          </div>

          {/* What We Collect */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-primary mb-4">
              What We Collect
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bridge-gold mt-2 flex-shrink-0" />
                <p className="text-secondary text-sm leading-relaxed">
                  <span className="font-medium text-primary">
                    Assessment responses
                  </span>{' '}
                  &mdash; the dream description, strengths, working style, and
                  commitment level you provide during the assessment. This data
                  is sent to our AI service to generate your profile and is not
                  stored on our servers after generation.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bridge-gold mt-2 flex-shrink-0" />
                <p className="text-secondary text-sm leading-relaxed">
                  <span className="font-medium text-primary">
                    Generated profiles
                  </span>{' '}
                  &mdash; your Partnership Profile is saved locally in your
                  browser&apos;s localStorage. We do not store it on our
                  servers.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bridge-gold mt-2 flex-shrink-0" />
                <p className="text-secondary text-sm leading-relaxed">
                  <span className="font-medium text-primary">
                    Basic analytics
                  </span>{' '}
                  &mdash; standard anonymous usage data (page views, browser
                  type, general location) to understand how people use BRIDGE.
                  No personal identification.
                </p>
              </li>
            </ul>
          </div>

          {/* How We Use It */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-primary mb-4">
              How We Use It
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bridge-gold mt-2 flex-shrink-0" />
                <p className="text-secondary text-sm leading-relaxed">
                  Your assessment data is used solely to generate your
                  personalized Partnership Profile via our AI service (OpenAI
                  GPT-4o).
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bridge-gold mt-2 flex-shrink-0" />
                <p className="text-secondary text-sm leading-relaxed">
                  Analytics data helps us improve the BRIDGE experience for
                  everyone.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bridge-gold mt-2 flex-shrink-0" />
                <p className="text-secondary text-sm leading-relaxed">
                  If you share your profile via a link, the profile data is
                  encoded in the URL itself. We do not store shared profiles on
                  our servers.
                </p>
              </li>
            </ul>
          </div>

          {/* What We Don't Do */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-primary mb-4">
              What We Don&apos;t Do
            </h2>
            <div className="bg-white rounded-2xl p-6 border border-border space-y-3">
              <p className="text-secondary text-sm leading-relaxed flex items-start gap-3">
                <span className="text-bridge-rose font-bold flex-shrink-0">
                  &times;
                </span>
                We do not sell your data to anyone. Ever.
              </p>
              <p className="text-secondary text-sm leading-relaxed flex items-start gap-3">
                <span className="text-bridge-rose font-bold flex-shrink-0">
                  &times;
                </span>
                We do not run ads or use your data for advertising.
              </p>
              <p className="text-secondary text-sm leading-relaxed flex items-start gap-3">
                <span className="text-bridge-rose font-bold flex-shrink-0">
                  &times;
                </span>
                We do not store health, financial, or sensitive personal data.
              </p>
              <p className="text-secondary text-sm leading-relaxed flex items-start gap-3">
                <span className="text-bridge-rose font-bold flex-shrink-0">
                  &times;
                </span>
                We do not share your assessment responses with third parties
                (beyond the AI service used to generate your profile).
              </p>
              <p className="text-secondary text-sm leading-relaxed flex items-start gap-3">
                <span className="text-bridge-rose font-bold flex-shrink-0">
                  &times;
                </span>
                We do not track you across other websites.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-primary mb-4">
              Your Rights
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bridge-gold mt-2 flex-shrink-0" />
                <p className="text-secondary text-sm leading-relaxed">
                  You can clear your locally stored profile at any time by
                  clearing your browser&apos;s localStorage.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bridge-gold mt-2 flex-shrink-0" />
                <p className="text-secondary text-sm leading-relaxed">
                  You can request deletion of any data associated with your
                  email by contacting us.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bridge-gold mt-2 flex-shrink-0" />
                <p className="text-secondary text-sm leading-relaxed">
                  You have the right to access, correct, or delete your personal
                  data at any time.
                </p>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-primary mb-4">
              Contact
            </h2>
            <p className="text-secondary text-sm leading-relaxed">
              Questions about your privacy? Reach us at{' '}
              <a
                href="mailto:privacy@bridge-platform.com"
                className="text-bridge-gold hover:text-bridge-gold-dark underline underline-offset-2 transition-colors duration-200"
              >
                privacy@bridge-platform.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
