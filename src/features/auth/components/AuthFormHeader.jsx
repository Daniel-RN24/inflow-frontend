import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthFormHeader({ icon, title, description }) {
  const Icon = icon;

  return (
    <CardHeader className="pt-8 text-center">
      <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="size-6" />
      </div>
      <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
      {description ? <CardDescription className="mt-1">{description}</CardDescription> : null}
    </CardHeader>
  );
}