import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const VerifyEmailPage = ({ searchParams }: PageProps) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;
  return (
    <div className="container mx-auto relative flex flex-col pt-20 items-center justify-center lg:px-0">
      <div className="mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[500px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex flex-col h-full items-center justify-center space-y-1 w-full">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image
                src="/hippo-email-sent.png"
                alt="hippo email sent img"
                fill
              />
            </div>
            <h3 className="font-semibold text-2xl">Check your email</h3>
            {toEmail ? (
              <p>
                We&apos;ve sent a verification link{" "}
                <span className="font-semibold ">{toEmail}</span>.
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to your email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
