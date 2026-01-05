
import { useComparison } from '../Hooks/useComparison.jsx';
import { useNavigate } from 'react-router-dom';

const ComparisonBar = () => {
    const { comparisonList, removeFromComparison, clearComparison, canCompare } = useComparison();
    const navigate = useNavigate();

    // Don't show if no recipes in comparison
    if (comparisonList.length === 0) {
        return null;
    }

    const handleCompare = () => {
        if (canCompare()) {
            navigate('/compare');
        }
    };

    return (
        <div className='fixed bottom-0 left-0 right-0 bg-white border-t-4 border-[#58e633] shadow-2xl z-50 transform transition-all duration-300'>
            <div className='max-w-7xl mx-auto px-4 py-4'>
                <div className='flex items-center justify-between gap-4'>
                    {/* Left side - Recipe thumbnails */}
                    <div className='flex items-center gap-3 flex-1'>
                        <div className='flex items-center gap-2'>
                            <span className='text-lg font-bold font-share'>Compare:</span>
                            <span className='text-sm text-gray-600 font-share'>
                                ({comparisonList.length}/3)
                            </span>
                        </div>

                        <div className='flex gap-2 overflow-x-auto flex-1'>
                            {comparisonList.map(recipe => (
                                <div 
                                    key={recipe.idMeal} 
                                    className='relative flex-shrink-0 group'
                                >
                                    <img 
                                        src={recipe.strMealThumb} 
                                        alt={recipe.strMeal}
                                        className='w-16 h-16 rounded-lg object-cover border-2 border-gray-300'
                                    />
                                    <button
                                        onClick={() => removeFromComparison(recipe.idMeal)}
                                        className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100'
                                        title='Remove'
                                    >
                                        ✕
                                    </button>
                                    <div className='absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs px-1 py-0.5 rounded-b-lg truncate'>
                                        {recipe.strMeal.substring(0, 10)}...
                                    </div>
                                </div>
                            ))}

                            {/* Empty slots */}
                            {Array.from({ length: 3 - comparisonList.length }).map((_, i) => (
                                <div 
                                    key={`empty-${i}`}
                                    className='w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50'
                                >
                                    <span className='text-gray-400 text-2xl'>+</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side - Action buttons */}
                    <div className='flex items-center gap-3'>
                        {!canCompare() && (
                            <span className='text-sm text-gray-500 font-share'>
                                Add {2 - comparisonList.length} more to compare
                            </span>
                        )}
                        
                        <button
                            onClick={handleCompare}
                            disabled={!canCompare()}
                            className={`px-6 py-3 font-semibold rounded-lg transition-all font-share ${
                                canCompare() 
                                    ? 'bg-[#58e633] text-black hover:bg-[#3dc91d] cursor-pointer' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            Compare Now
                        </button>

                        <button
                            onClick={clearComparison}
                            className='px-4 py-3 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors font-share'
                        >
                            Clear All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparisonBar;