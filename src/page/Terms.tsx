import { Link } from "react-router-dom";

function TermsOfService() {
  return (
    <main className="flex-1">
      <section className="bg-muted py-12 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold md:text-4xl">Terms of Service</h1>
            <p className="text-muted-foreground">
              These Terms of Service govern your use of the Adekunle Ajasin
              University <strong>Campus Voice</strong>.
            </p>
            <p className="text-muted-foreground">
              By accessing or using our services, you agree to be bound by these
              terms.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Use of Services</h2>
              <p className="text-muted-foreground">
                You may use our services only in accordance with these terms and
                all applicable laws. You are responsible for your use of the
                services and for any content you provide.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Prohibited Activities</h2>
              <p className="text-muted-foreground">
                You may not use our services to engage in any illegal or
                unauthorized activities. This includes, but is not limited to,
                violating any laws, infringing on any intellectual property
                rights, or engaging in any abusive or harmful behavior.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your access to our services at any
                time, without notice, for conduct that we believe violates these
                terms or is harmful to other users of the services.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the fullest extent permitted by law, we will not be liable
                for any indirect, incidental, or consequential damages arising
                out of or in connection with your use of our services.
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
              If you have any questions about these Terms of Service, please
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

export default TermsOfService;
