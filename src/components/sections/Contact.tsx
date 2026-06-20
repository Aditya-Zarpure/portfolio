"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

type FormInputs = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const serviceId = "YOUR_SERVICE_ID";
      const templateId = "YOUR_TEMPLATE_ID";
      const publicKey = "YOUR_PUBLIC_KEY";

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          reply_to: data.email,
          message: data.message,
        },
        publicKey
      );
      
      setIsSuccess(true);
    } catch {
      alert("Something went wrong. Please check your credentials in Contact.tsx or try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "w-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] px-[18px] py-[14px] rounded-[2px] text-[14px] font-body focus:outline-none focus:border-[var(--accent)] transition-colors duration-300";
  const labelStyles = "block text-[11px] tracking-[0.15em] text-[var(--text-muted)] uppercase mb-[8px] font-body";
  const errorStyles = "text-[#ef4444] text-[12px] mt-1 font-body";

  return (
    <SectionWrapper id="contact">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px] items-start">
        {/* Left Column */}
        <div>
          <SectionLabel className="mb-[24px]">Get In Touch</SectionLabel>
          <h2 
            className="font-display font-light text-[var(--text-primary)] leading-[1.2]"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            Let&apos;s build something great together.
          </h2>
          <p className="text-[15px] text-[var(--text-muted)] mt-[20px] leading-[1.8] font-body">
            Have a project in mind? I&apos;d love to hear about it. Send me a message and I&apos;ll get back to you within 24 hours.
          </p>
          <div className="mt-[32px]">
            <Link 
              href="mailto:adityazarpure8080@gmail.com" 
              className="text-[14px] text-[var(--accent)] no-underline hover:underline font-body"
            >
              adityazarpure8080@gmail.com
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center py-[60px] bg-[var(--surface)] border border-[var(--border)] rounded-[4px] px-6">
              <CheckCircle2 size={48} className="text-[var(--accent)] mb-6" />
              <h3 className="font-display text-[24px] text-[var(--text-primary)]">
                Message sent. I&apos;ll be in touch shortly.
              </h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[24px]">
              <div>
                <label className={labelStyles}>Name</label>
                <input 
                  type="text"
                  className={inputStyles}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className={errorStyles}>{errors.name.message}</p>}
              </div>

              <div>
                <label className={labelStyles}>Email</label>
                <input 
                  type="email"
                  className={inputStyles}
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && <p className={errorStyles}>{errors.email.message}</p>}
              </div>

              <div>
                <label className={labelStyles}>Message</label>
                <textarea 
                  className={`${inputStyles} min-h-[140px] resize-y`}
                  {...register("message", { required: "Message is required" })}
                />
                {errors.message && <p className={errorStyles}>{errors.message.message}</p>}
              </div>

              <Button type="submit" variant="primary" className="w-full mt-[8px]" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message \u2192"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
