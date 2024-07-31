import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const { user, showLogin } = useAuth();
  const [email, setEmail] = useState<string>("");

  return (
    <main className="flex-1">
      <section className="w-full py-4 md:py-8 lg:py-16 bg-primary flex flex-col justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4 text-primary-foreground">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Empower Your Voice with AAUA Campus Voice
                </h1>
                <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Easily submit, vote, and track the status of your suggestions
                  for a better campus experience.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {!user && (
                  <Button
                    className="inline-flex h-10 items-center width-auto justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => showLogin()}
                  >
                    Sign Up
                  </Button>
                )}
                <Link
                  to="/about"
                  className="inline-flex h-10 items-center width-auto justify-center rounded-md border border-primary-foreground bg-primary px-8 text-sm font-medium shadow-sm transition-colors hover:bg-primary-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <img
              src="/placeholder.svg"
              width="550"
              height="550"
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-muted"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Streamline Your Suggestions
              </h2>
              <p className="max-w-[900px] pb-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                <strong>Campus Voice</strong> empowers you to easily submit,
                vote, and track the status of your suggestions for a better
                campus experience.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">User Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Secure your account and ensure your suggestions are associated
                with your profile.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Suggestion Submission</h3>
              <p className="text-sm text-muted-foreground">
                Easily submit your suggestions with relevant details to help the
                university address your concerns.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Voting and Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Vote on suggestions submitted by others and monitor the status
                of your own suggestions.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Admin Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                University administrators can manage and respond to all
                submitted suggestions.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Mobile Responsiveness</h3>
              <p className="text-sm text-muted-foreground">
                Access the <strong>Campus Voice</strong> from any device,
                ensuring accessibility for the rural university community.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Improved Campus Experience</h3>
              <p className="text-sm text-muted-foreground">
                Your suggestions can help shape a better campus environment for
                all students and staff.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                About the App
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Empowering the Adekunle Ajasin University Community
              </h2>
              <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The <strong>Campus Voice</strong>is a web-based platform that
                allows students, staff, and faculty to easily submit, vote, and
                track the status of their suggestions for improving the campus
                experience. With a focus on mobile responsiveness, the app
                ensures accessibility for the rural university community.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <img
              src="/placeholder.svg"
              width="550"
              height="310"
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">
                      User-Friendly Interface
                    </h3>
                    <p className="text-muted-foreground">
                      The intuitive design of the <strong>Campus Voice</strong>{" "}
                      makes it easy for users to navigate and submit their
                      ideas.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Transparent Feedback</h3>
                    <p className="text-muted-foreground">
                      Users can track the status of their suggestions and see
                      how the university is addressing their concerns.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">
                      Collaborative Approach
                    </h3>
                    <p className="text-muted-foreground">
                      The voting system allows the community to collectively
                      prioritize the most important suggestions.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:gap-10 justify-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Accessible for All
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The <strong>Campus Voice</strong> is a free-to-use platform,
              ensuring that all members of the campus community can participate
              and have their voices heard.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:justify-end">
            {!user && (
              <Button
                onClick={showLogin}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Sign Up
              </Button>
            )}
            <Link
              to="/about"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from our satisfied users about their experience with the
              <strong>Campus Voice</strong> app.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl divide-y rounded-lg border md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="grid gap-4 p-8 md:p-10">
              <div className="flex gap-4 justify-center flex-col items-center">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-bold">John Doe</div>
                  <div className="text-muted-foreground">Student</div>
                </div>
              </div>
              <div className="prose text-muted-foreground">
                <p>
                  "The <strong>Campus Voice</strong> app has been a game-changer
                  for our university. It's so easy to submit ideas and track
                  their progress. I've seen several of my suggestions
                  implemented, and it's really empowering."
                </p>
              </div>
            </div>
            <div className="grid gap-4 p-8 md:p-10">
              <div className="flex gap-4 justify-center flex-col items-center">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-bold">Jane Doe</div>
                  <div className="text-muted-foreground">Faculty</div>
                </div>
              </div>
              <div className="prose text-muted-foreground">
                <p>
                  "As a faculty member, I've found the{" "}
                  <strong>Campus Voice</strong> app to be an invaluable tool for
                  gathering feedback and implementing improvements. The admin
                  dashboard makes it easy to manage and respond to suggestions."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have any questions or feedback about the Adekunle Ajasin
              University <strong>Campus Voice</strong>? Don't hesitate to reach
              out to us.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();

                if (user && user.email) setEmail(user.email);

                if (!email) return;

                window.location.href = `/contact?email=${email}`;
              }}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-lg flex-1"
                required
                value={user?.email ?? email}
                readOnly={!!user}
                disabled={!!user}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <Button type="submit">Contact Us</Button>
            </form>
            <p className="text-xs text-muted-foreground">
              We'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
