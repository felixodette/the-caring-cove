import { Search, Folder } from "lucide-react";
import Link from "next/link";

const categories = [
  "Digital marketing", "Machine learning", "It management",
  "Loan & Insurance", "Web Design", "Digital Marketing", "IT Consultancy",
];

const recentPosts = [
  { title: "Maecenas Tempus Dellus Eget", img: "/images/blog-1.jpg", id: 1 },
  { title: "Cloud Computing Security Tips", img: "/images/blog-2.jpg", id: 2 },
  { title: "Data Analytics Modern Trends", img: "/images/blog-3.jpg", id: 3 },
];

const BlogSidebar = () => (
  <aside className="space-y-8">
    {/* Search */}
    <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
      <h4 className="font-bold text-lg text-foreground mb-4 border-b-2 border-primary pb-2 inline-block">Search Keyword</h4>
      <div className="relative mt-4">
        <input
          type="text"
          placeholder="Key word"
          className="w-full border border-border rounded px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
          <Search className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* Categories */}
    <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
      <h4 className="font-bold text-lg text-foreground mb-4 border-b-2 border-primary pb-2 inline-block">Category</h4>
      <ul className="space-y-3 mt-4">
        {categories.map((c) => (
          <li key={c}>
            <a href="#" className="flex items-center gap-2 text-muted-foreground text-sm hover:text-primary transition-colors">
              <Folder className="w-4 h-4" /> {c}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Recent Posts */}
    <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
      <h4 className="font-bold text-lg text-foreground mb-4 border-b-2 border-primary pb-2 inline-block">Recent Posts</h4>
      <div className="space-y-4 mt-4">
        {recentPosts.map((p) => (
          <Link key={p.id} href={`/blog-details/${p.id}`} className="flex gap-3 group">
            <img src={p.img} alt={p.title} className="w-16 h-16 rounded object-cover shrink-0" />
            <div>
              <h5 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{p.title}</h5>
              <p className="text-xs text-muted-foreground">25 May 2021</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </aside>
);

export default BlogSidebar;
