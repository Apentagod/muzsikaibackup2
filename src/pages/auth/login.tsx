
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PasswordResetDialog } from "@/components/auth/PasswordResetDialog";
import authService from "@/services/auth";
import { Music } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.login({ email, password });
      toast({
        title: "Sikeres bejelentkezés",
        description: "Üdvözlünk újra!",
      });
      router.push("/chatbot");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hiba történt",
        description: "A bejelentkezés sikertelen. Kérjük, ellenőrizd az adataidat.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>MuzsikaI – Bejelentkezés</title>
        <meta name="description" content="Jelentkezz be a MuzsikaI fiókodba és kezdj el dalszövegeket írni AI segítségével." />
      </Head>
      <main 
        className="min-h-screen bg-gradient-to-r from-[#00C4FF] via-[#FF69B4] to-[#8B5CF6] py-16 px-4
          relative overflow-hidden animate-gradient-x"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {[...Array(6)].map((_, i) => (
              <Music
                key={i}
                className="absolute text-[#FFD700] animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
                size={32}
              />
            ))}
          </div>
        </div>

        <Card className="max-w-md mx-auto bg-white/95 backdrop-blur-sm border-none
          shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl
          animate-fade-in transform hover:scale-[1.01] transition-all duration-300"
        >
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-[#1A2238]">
              Bejelentkezés
            </CardTitle>
            <CardDescription className="text-[#1A2238]/70">
              Jelentkezz be a MuzsikaI fiókodba
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email cím"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-[#00DDEB] focus:ring-[#00DDEB] bg-white/50"
                  required
                  aria-label="Email cím"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Jelszó"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-[#00DDEB] focus:ring-[#00DDEB] bg-white/50"
                  required
                  aria-label="Jelszó"
                />
                <div className="text-right">
                  <PasswordResetDialog />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#7B3FE4] hover:bg-[#00DDEB] text-white font-medium
                  transform hover:scale-[1.02] transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Bejelentkezés..." : "Bejelentkezés"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => authService.loginWithGoogle()}
              className="w-full bg-[#00DDEB] hover:bg-[#7B3FE4] text-white border-none
                transform hover:scale-[1.02] transition-all duration-300"
            >
              Bejelentkezés Google fiókkal
            </Button>
            <p className="text-sm text-[#1A2238]/70 text-center">
              Még nincs fiókod?{" "}
              <Link 
                href="/auth/register" 
                className="text-[#00DDEB] hover:text-[#7B3FE4] transition-colors duration-300"
              >
                Regisztrálj
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
