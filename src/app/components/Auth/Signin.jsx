'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const Signin = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const loginPromise = signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false
        })

        toast.promise(loginPromise, {
            loading: 'Signing in...',
            success: (result) => {
                if (result.error) {
                    throw new Error(result.error)
                }
                router.push('/dashboard')
                router.refresh()
                return 'Successfully Signed In'
            },
            error: (err) => `${err.message || 'Failed to sign in'}`
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-transparent ">
                <div className='logo-container flex items-center justify-center mb-8 gap-2.5'>
                    <img src="/favicon-light.png" alt="App Logo" className="w-14 h-14" />
                    <h1 className='font-sf-heavy text-4xl font-semibold text-app-blue_secondary'>DeepCode</h1>
                </div>
                
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default Signin
