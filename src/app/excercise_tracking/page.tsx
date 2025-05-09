// using reusable component for search bar 

import SearchBar from '@/app/components/SearchBar';


export default function ExcerciseTracking() {
  return (
    <div>
      <main>
      <h1 className="text-2xl font-bold mb-4">Search Exercises</h1>
      <SearchBar type = "exercise" />
      </main>
      <footer>
        
      </footer>
    </div>
  );
}
