import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

function About() {
  return (
    <main className="flex-1">
      <section className="bg-muted py-12 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold md:text-4xl">
                Share your ideas and suggestions
              </h1>
              <p className="text-muted-foreground">
                Help us improve the university experience for everyone.
              </p>
              <Link
                to={"/suggestions"}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-md py-2 px-4"
              >
                <span>Submit a Suggestion</span>
                <PlusIcon className="h-5 w-5" />
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/placeholder.svg"
                width={400}
                height={400}
                alt="..."
                className="max-w-full"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About the App</h2>
              <p className="text-muted-foreground">
                The AAUA <strong>Campus Voice</strong> is a platform for
                students, faculty, and staff to share their ideas and feedback
                with the university administration.
              </p>
              <p className="text-muted-foreground">
                Your suggestions can help us improve the campus experience,
                enhance academic programs, and address important issues.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About AAUA</h2>
              <p className="text-muted-foreground">
                Adekunle Ajasin University, Akoko (AAUA) is a state-owned
                university located in Akungba-Akoko, Ondo State, Nigeria. It was
                established in 1999 and has since grown to become one of the
                leading universities in the region.
              </p>
              <p className="text-muted-foreground">
                AAUA offers a wide range of academic programs across various
                disciplines, including science, technology, engineering, arts,
                and social sciences.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">How it Works</h2>
              <p className="text-muted-foreground">
                Users can submit suggestions through the app, which will then be
                reviewed by the appropriate department or committee.
              </p>
              <p className="text-muted-foreground">
                Suggestions can be tracked, commented on, and voted by other
                users. The university will provide updates on the status of each
                suggestion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
