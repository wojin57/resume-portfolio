import { Hero } from "@/components/resume/Hero";
import { Projects } from "@/components/resume/Projects";
import { TechStack } from "@/components/resume/TechStack";
import { Education } from "@/components/resume/Education";
import { Separator } from "@/components/ui/separator";

export default function ResumePage() {
    return (
        <div className="mx-auto max-w-4xl px-6 py-8">
            <Hero />
            <Separator />
            <Projects />
            <Separator />
            <TechStack />
            <Separator />
            <Education />
        </div>
    );
}
