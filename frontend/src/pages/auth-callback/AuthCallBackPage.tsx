import { Card, CardContent } from "@/components/ui/card"
import { axiosInstance } from "@/lib/axios"
import { useUser } from "@clerk/clerk-react"
import { Loader } from "lucide-react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const AuthCallBackPage = () => {
  const {isLoaded, user} = useUser(); 
  const navigate = useNavigate();
  const syncAttempted = useRef(false); // only for dev so that useEffect doesnt run twice
  useEffect(() => {
    const syncUser = async() =>{
      try {
        if(!isLoaded || !user  || syncAttempted.current) return;
        await axiosInstance.post('/auth/callback', {
          id: user.id,
          firstName: user.firstName,
          imageUrl: user.imageUrl,
          email: user.emailAddresses[0].emailAddress
        });
        syncAttempted.current = true;
      } catch (error) {
        console.log("Error in auth callback", error);
      } finally{
        navigate('/');
      }
    }
    syncUser();
  }, [isLoaded, user, navigate]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-dull border-zinc-900 h-1/4">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 text-neon animate-spin" />
          <h3 className="text-zinc-400 text-xl font-bold pt-5">Logging you in </h3>
          <p className="text-zinc-400 text-sm pt-5">Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthCallBackPage