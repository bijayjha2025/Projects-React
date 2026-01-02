import '../Styles/Skeletons.css'
export const Skeleton = ({ className = '' }) => {
 return (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );
};

export const RecipeCardSkeleton = () => {
    return (
     <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <Skeleton className='w-full h-48' />
        <div className='p-4'>
          <Skeleton className='h-6 w-4/5 mb-1' />
          <Skeleton className='h-4 w-1/2 mb-3' />
          <Skeleton className='h-9 w-28 rounded' />
        </div>
     </div>
    );
};

export const RecipeGridSkeleton = ({ count = 6 }) => {
 return (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, index) => (
    <RecipeCardSkeleton key={index} />
    ))}
 </div>
    );
};

export const RecipeDetailSkeleton = () => {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
       <Skeleton className='h-6 w-32 mb-6' />
            
       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <Skeleton className='w-full h-96' />
                
        <div className="p-8">
         <Skeleton className='h-10 w-3/4 mb-4' />
          <div className="flex flex-wrap gap-3 mb-6">
           <Skeleton className='h-8 w-24 rounded-full' />
           <Skeleton className='h-8 w-20 rounded-full' />
           <Skeleton className='h-8 w-16 rounded-full' />
          </div>
                    
                  
         <div className="mb-8">
          <Skeleton className='h-8 w-40 mb-4' />
          <div className="grid md:grid-cols-2 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
             <Skeleton className='w-2 h-2 rounded-full' />
             <Skeleton className='h-4 flex-1' />
            </div>
            ))}
          </div>
        </div>
                    
        <div className="mb-8">
         <Skeleton className='h-8 w-40 mb-4' />
          <div className="space-y-3">
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-4/5' />
          </div>
         </div>
                    
        <div className="mb-8">
         <Skeleton className='h-8 w-40 mb-4' />
         <Skeleton className='w-full h-80 rounded-lg' />
        </div>
                    
        <div className="flex gap-4">
         <Skeleton className='flex-1 h-12 rounded' />
         <Skeleton className='flex-1 h-12 rounded' />
         </div>
        </div>
       </div>
      </div>
    );
};

export const CategoryButtonsSkeleton = ({ count = 8 }) => {
    return (
        <div className="flex flex-wrap justify-center gap-3">
         {Array.from({ length: count }).map((_, index) => (
          <Skeleton key={index} className='h-8 w-24 rounded-full' />
         ))}
        </div>
    );
};

export const SearchSuggestionsSkeleton = () => {
    return (
        <div className='mt-6 flex flex-wrap justify-center gap-3'>
         <Skeleton className='h-4 w-24' />
         <Skeleton className='h-8 w-20 rounded-full' />
         <Skeleton className='h-8 w-16 rounded-full' />
         <Skeleton className='h-8 w-20 rounded-full' />
         <Skeleton className='h-8 w-16 rounded-full' />
        </div>
    );
};

export const MealPlanDayCardSkeleton = () => {
    return (
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          <div className='bg-gray-200 px-4 py-3'>
           <Skeleton className='h-6 w-24' />
          </div>
            
          <div className='p-4 min-h-[200px]'>
            {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='border border-gray-200 rounded-lg p-3 mb-3'>
             <div className='flex gap-3'>
              <Skeleton className='w-16 h-16 rounded' />
              <div className='flex-1'>
               <Skeleton className='h-4 w-3/4 mb-2' />
               <Skeleton className='h-3 w-1/2' />
              </div>
             </div>
            </div>
                ))}
            </div>
        </div>
    );
};

export const MealPlannerGridSkeleton = () => {
    return (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
         {Array.from({ length: 7 }).map((_, index) => (
          <MealPlanDayCardSkeleton key={index} />
         ))}
        </div>
    );
};

export const ShoppingListSkeleton = () => {
    return (
        <div className='space-y-2'>
         {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className='flex items-start gap-3 p-3 bg-gray-50 rounded-lg'>
           <Skeleton className='w-4 h-4 rounded' />
            <div className='flex-1'>
             <Skeleton className='h-4 w-3/4 mb-2' />
             <Skeleton className='h-3 w-1/2' />
            </div>
          </div>
          ))}
        </div>
    );
};

export const StatsCardSkeleton = () => {
    return (
        <div className='bg-white px-6 py-3 rounded-lg shadow-md'>
          <Skeleton className='h-4 w-24 mb-2' />
          <Skeleton className='h-10 w-16' />
        </div>
    );
};


export const FavoritesPageSkeleton = () => {
    return (
        <div className='py-8 bg-gray-50 min-h-screen'>
          <div className='max-w-6xl mx-auto px-4'>
            <Skeleton className='h-10 w-64 mx-auto mb-8' />
            <Skeleton className='h-6 w-48 mx-auto mb-8' />
            <RecipeGridSkeleton count={6} />
            </div>
        </div>
    );
};

export const LoadingSpinner = ({ size = 'md', text = '' }) => {
    const sizeClasses = {
        sm: 'h-8 w-8 border-2',
        md: 'h-16 w-16 border-4',
        lg: 'h-24 w-24 border-4'
    };

    return (
        <div className='flex flex-col items-center justify-center py-16'>
         <div className={`animate-spin rounded-full border-[#58e633] border-t-transparent ${sizeClasses[size]}`}></div>
          {text && <p className='text-xl font-share text-gray-700 mt-4'>{text}</p>}
        </div>
    );
};

export const ShimmerSkeleton = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded animate-shimmer ${className}`} />
  );
};