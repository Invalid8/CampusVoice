import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <main className="flex-1">
      <section className="bg-muted py-12 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold md:text-4xl">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Your privacy is important to us. This Privacy Policy explains how
              we collect, use, and share information about you when you use our
              services.
            </p>
            <p className="text-muted-foreground">
              By using the Adekunle Ajasin University{" "}
              <strong>Campus Voice</strong>, you agree to the collection and use
              of information in accordance with this policy.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Information Collection</h2>
              <p className="text-muted-foreground">
                We collect information that you provide directly to us when you
                use our services. This includes your name, email address, and
                any other information you choose to provide.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Use of Information</h2>
              <p className="text-muted-foreground">
                We use the information we collect to provide, maintain, and
                improve our services. We may also use the information to
                communicate with you and to show you personalized content.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Sharing of Information</h2>
              <p className="text-muted-foreground">
                We may share your information with third parties for the
                purposes of providing our services, complying with legal
                obligations, and protecting our rights.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Choices</h2>
              <p className="text-muted-foreground">
                You have choices regarding the information we collect and how it
                is used. You can choose not to provide certain information, but
                this may limit your ability to use some of our services.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <Link to="/contact" className="text-primary hover:underline">
                Contact Us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PrivacyPolicy;
