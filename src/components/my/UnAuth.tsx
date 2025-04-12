import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export const UnAuth = () => (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className='text-center font-semibold text-xl'>Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-center text-muted-foreground mb-4'>Login to access your profile and connect with others</p>
          <div className='flex flex-col gap-4'>
            <SignInButton mode='modal'>
              <Button variant={'outline'}>Login</Button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <Button>Sign Up</Button>
            </SignUpButton>
          </div>
        </CardContent>
      </Card>
    </div>
  )