import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import authService from "@/services/auth";
import { Music } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.register({ email, password, acceptedTerms });
      toast({
        title: "Sikeresen regisztráltál!",
        description: "A fiókodat sikeresen létrehoztuk. Kérjük, erősítsd meg az email címedet a kiküldött levélben található linkre kattintva.",
      });
      router.push("/chatbot");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hiba történt",
        description: "A regisztráció sikertelen. Kérjük, próbáld újra.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (!acceptedTerms) {
      toast({
        variant: "destructive",
        title: "ÁSZF elfogadása szükséges",
        description: "A regisztrációhoz el kell fogadnod az ÁSZF-et és az Adatvédelmi tájékoztatót.",
      });
      return;
    }

    setIsLoading(true);
    try {
      await authService.loginWithGoogle();
      toast({
        title: "Sikeresen regisztráltál!",
        description: "Üdvözlünk a MuzsikaI közösségében!",
      });
      router.push("/chatbot");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hiba történt",
        description: "A Google regisztráció sikertelen. Kérjük, próbáld újra.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>MuzsikaI – Regisztráció</title>
        <meta name="description" content="Regisztrálj a MuzsikaI-ba és kezdj el dalszövegeket írni AI segítségével." />
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
              Regisztráció
            </CardTitle>
            <CardDescription className="text-[#1A2238]/70">
              Hozd létre MuzsikaI fiókodat
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
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  className="border-[#00DDEB] data-[state=checked]:bg-[#00DDEB]"
                  aria-label="ÁSZF és Adatvédelmi tájékoztató elfogadása"
                />
                <label htmlFor="terms" className="text-sm text-[#1A2238]/70">
                  Elfogadom az{" "}
                  <Link 
                    href="/terms-of-service" 
                    className="text-[#00DDEB] hover:text-[#7B3FE4] transition-colors duration-300"
                  >
                    ÁSZF-et
                  </Link>{" "}
                  és az{" "}
                  <Link 
                    href="/privacy-policy" 
                    className="text-[#00DDEB] hover:text-[#7B3FE4] transition-colors duration-300"
                  >
                    Adatvédelmi tájékoztatót
                  </Link>
                </label>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#7B3FE4] hover:bg-[#00DDEB] text-white font-medium
                  transform hover:scale-[1.02] transition-all duration-300
                  disabled:bg-gray-400 disabled:transform-none"
                disabled={isLoading || !acceptedTerms}
              >
                {isLoading ? "Regisztráció..." : "Regisztráció"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleRegister}
              className="w-full bg-[#00DDEB] hover:bg-[#7B3FE4] text-white border-none
                transform hover:scale-[1.02] transition-all duration-300
                disabled:bg-gray-400 disabled:transform-none"
              disabled={isLoading || !acceptedTerms}
            >
              Regisztráció Google fiókkal
            </Button>
            <p className="text-sm text-[#1A2238]/70 text-center">
              Már van fiókod?{" "}
              <Link 
                href="/auth/login" 
                className="text-[#00DDEB] hover:text-[#7B3FE4] transition-colors duration-300"
              >
                Jelentkezz be
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}