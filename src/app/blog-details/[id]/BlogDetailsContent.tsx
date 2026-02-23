"use client";

import { User, Calendar, MessageCircle, Tag } from "lucide-react";

export default function BlogDetailsContent() {
  return (
    <>
      <img src="/images/blog-1.jpg" alt="Blog post" className="w-full rounded-lg mb-6" />
      <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-xs mb-6">
        <span className="flex items-center gap-1"><User className="w-3 h-3" /> By Admin</span>
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> 25 May 2021</span>
        <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> 22 Comment</span>
        <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> It Solution</span>
      </div>
      <p className="text-muted-foreground mb-6">
        Cras varius. Donec vitae orci sed dolor rutrum auctor. Fusce egestas elit eget lorem. Suspendisse nisl elit, rhoncus eget elementum acondimentum eget, diam. Nam at tortor in tellus interdum sagitliquam lobortis. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Curabitur blandit mollis lacus. Nam adipiscing. Vestibulum eu odio. Vivamus laoreet.
      </p>
      <blockquote className="border-l-4 border-primary bg-section-bg p-6 italic text-muted-foreground mb-6">
        Sollicitudin nisi nulla eget augue. Maecenas quis turpaliquet, portorem et, dictum purus. Cdimentfermentposuere world class service provider
      </blockquote>
      <img src="/images/blog-detail.jpg" alt="Blog detail" className="w-full rounded-lg mb-6" />
      <h3 className="text-xl font-bold text-foreground mb-3">Pellentesque habita morbi tristique</h3>
      <p className="text-muted-foreground mb-4">
        Mauris turpis nunc, blandit et vat molestie pligula. aretra convallis urna. Quisque ut nisi.
      </p>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-8">
        <li>Lorem available market</li>
        <li>Injected humour words which</li>
        <li>Available market</li>
      </ul>

      {/* Comment Form */}
      <div className="bg-section-bg p-8 rounded-lg">
        <h3 className="text-xl font-bold text-foreground mb-6">Leave a Comment</h3>
        <form className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Your Name" className="w-full border border-border rounded px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="email" placeholder="Email" className="w-full border border-border rounded px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <textarea rows={5} placeholder="Write your comment" className="w-full border border-border rounded px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          <button type="submit" className="bg-primary text-primary-foreground px-8 py-3 rounded font-semibold text-sm hover:bg-primary/90 transition-colors">
            Submit Now
          </button>
        </form>
      </div>
    </>
  );
}
