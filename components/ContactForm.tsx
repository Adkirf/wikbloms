'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone } from "lucide-react"
import { Dictionary } from '@/app/[lang]/dictionaries'
import { useState } from "react"

export default function ContactForm({ dict }: { dict: Dictionary }) {

  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = dict.contactForm.validation.nameRequired;
    }

    if (!formData.email && !formData.phone) {
      newErrors.contact = dict.contactForm.validation.contactRequired;
    }

    const now = Date.now();
    if (now - lastSubmissionTime < 10000) {
      newErrors.rateLimit = dict.contactForm.validation.tooManyRequests;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', phone: '', email: '', message: '' });
        setLastSubmissionTime(Date.now());
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-2xl mx-auto lg:pt-4 p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center text-foreground">{dict.contactForm.title}</h2>
      <div className="mb-8 text-center">
        <div className="space-y-2">
          <p className="flex items-center justify-center text-sm text-foreground">
            <Mail className="mr-2 h-4 w-4" />
            <a href={`mailto:${dict.footer.email}`} className="text-primary hover:underline">{dict.footer.email}</a>
          </p>
          <p className="flex items-center justify-center text-sm text-foreground">
            <Phone className="mr-2 h-4 w-4" />
            <a href={`tel:${dict.footer.phone}`} className="text-primary hover:underline">{dict.footer.phone}</a>
          </p>
          <p className="text-sm text-muted-foreground mb-4">{dict.contactForm.or}</p>
          <Separator className="my-4" />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
            {dict.contactForm.label.name} *
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={dict.contactForm.placeholder.name}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
              {dict.contactForm.label.phone}
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder={dict.contactForm.placeholder.phone}
              className={errors.contact ? 'border-red-500' : ''}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
              {dict.contactForm.label.email}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={dict.contactForm.placeholder.email}
              className={errors.contact ? 'border-red-500' : ''}
            />
          </div>
        </div>
        {errors.contact && (
          <p className="text-sm text-red-500 mt-1">{errors.contact}</p>
        )}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
            {dict.contactForm.label.message}
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={dict.contactForm.placeholder.message}
            className="min-h-[100px]"
            required
          />
        </div>
        {errors.rateLimit && (
          <p className="text-sm text-red-500">{errors.rateLimit}</p>
        )}
        {status && (
          <div className={`text-sm ${status.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {status}
          </div>
        )}
        <div className="flex justify-end w-full">
          <Button
            type="submit"
            className="w-36 bg-primary hover:bg-secondary text-primary-foreground"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>{dict.contactForm.label.sending}</span>
              </div>
            ) : (
              dict.contactForm.label.send
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
