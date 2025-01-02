'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import login from '@/lib/actions/login';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button>
            {pending ? (
                <div className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin" />
                    <span>Please wait</span>
                </div>
            ) : (
                'Login'
            )}
        </Button>
    );
};

const initialState = {
    type: '',
    message: '',
};

const LoginPage = () => {
    const [state, formAction] = useFormState(login, initialState);

    if (state.type === 'sucess') {
        window.location.href = '/';
    }
    
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <p aria-live="polite" className={`${state?.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                            {state?.message}
                        </p>
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">Enter you email below to login to your accound</p>
                    </div>
                    <form action={formAction}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="****@example.com"
                                    value="deepakgoswami1@gmail.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href={'/forget-password'} className="ml-auto inline-block text-sm underline">
                                        Forget your password?
                                    </Link>
                                </div>
                                <Input id="password" name="password" type="password" value="secret" required />
                            </div>
                            <SubmitButton />
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?
                        <Link href={'/signup'} className="underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image alt="image" src="/pizza.png" width={1920} height={1080} className="h-screen object-cover" />
            </div>
        </div>
    );
};

export default LoginPage;
