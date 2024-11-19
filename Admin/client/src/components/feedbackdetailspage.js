import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Search } from 'lucide-react';
import { exportToExcel, exportToCSV } from './exportUtils'; 

const FeedbackDetailsPage = () => {
  const navigate = useNavigate();
  const [combinedData, setCombinedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [feedbackResponse, ratingsResponse] = await Promise.all([
          axios.get(`http://localhost:3000/feedback`),
          axios.get(`http://localhost:3000/ratings`)
        ]);
        
        // Combine feedback and ratings in a single row based on matching indices
        const combinedItems = feedbackResponse.data.map((feedback, index) => ({
          id: feedback.id || ratingsResponse.data[index]?.id,
          // Feedback fields
          institutionName: feedback.institutionName || 'N/A',
          website: feedback.website || 'N/A',
          visitDate: feedback.visitDate || 'N/A',
          staffName: feedback.staffName || 'N/A',
          staffEmail: feedback.staffEmail || 'N/A',
          staffMobile: feedback.staffMobile || 'N/A',
          totalStudents: feedback.totalStudents || 'N/A',
          accompanyingStaff: feedback.accompanyingStaff || 'N/A',
          sources: feedback.sources || 'N/A',
          campuses: feedback.campuses || 'N/A',
          best: feedback.best || 'N/A',
          worst: feedback.worst || 'N/A',
          suggestions: feedback.suggestions || 'N/A',
          comments: feedback.comments || 'N/A',
          
          // Ratings fields (from corresponding index)
          iprRating: ratingsResponse.data[index]?.iprRating || 'N/A',
          fciptRating: ratingsResponse.data[index]?.fciptRating || 'N/A',
          knowledge: ratingsResponse.data[index]?.knowledge || 'N/A',
          explanationsIPR: ratingsResponse.data[index]?.explanationsIPR || 'N/A',
          explanationsFCIPT: ratingsResponse.data[index]?.explanationsFCIPT || 'N/A',
          knowledgeBefore: ratingsResponse.data[index]?.knowledgeBefore || 'N/A',
          knowledgeAfter: ratingsResponse.data[index]?.knowledgeAfter || 'N/A',
          technicalContents: ratingsResponse.data[index]?.technicalContents || 'N/A',
          easeOfUnderstanding: ratingsResponse.data[index]?.easeOfUnderstanding || 'N/A'
        }));

        setCombinedData(combinedItems);
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExport = (format) => {
    if (format === 'excel') {
      exportToExcel(combinedData, 'feedback_and_ratings');
    } else {
      exportToCSV(combinedData, 'feedback_and_ratings');
    }
  };

  const handleItemSelection = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelectedItems = () => {
    setCombinedData(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  // Columns in specific order: Feedback first, then Ratings
  const columns = [
    // Feedback Columns
    'institutionName', 'website', 'visitDate', 'staffName', 
    'staffEmail', 'staffMobile', 'totalStudents', 'accompanyingStaff', 
    'sources', 'campuses', 'best', 'worst', 'suggestions', 'comments',
    
    // Ratings Columns
    'iprRating', 'fciptRating', 'knowledge', 
    'explanationsIPR', 'explanationsFCIPT', 
    'knowledgeBefore', 'knowledgeAfter', 
    'technicalContents', 'easeOfUnderstanding'
  ];

  const filteredData = combinedData.filter(item => 
    columns.some(col => 
      String(item[col]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center"
        >
          Back to Dashboard
        </button>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-6">Feedback and Ratings Details</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search across all fields..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-96"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button
            onClick={() => handleExport('excel')}
            className="bg-green-500 text-white p-2 rounded mr-2"
          >
            Export as Excel
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Export as CSV
          </button>
          
          {selectedItems.length > 0 && (
            <button
              onClick={handleDeleteSelectedItems}
              className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-300"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={selectedItems.length === combinedData.length}
                  onChange={() => 
                    setSelectedItems(
                      selectedItems.length === combinedData.length 
                        ? [] 
                        : combinedData.map(item => item.id)
                    )
                  }
                />
              </th>
              {columns.map((col, index) => (
                <th 
                  key={col} 
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    index < 14 ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                  }`}
                >
                  {col.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr 
                key={item.id} 
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemSelection(item.id)}
                  />
                </td>
                {columns.map((col, colIndex) => (
                  <td 
                    key={col} 
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                      colIndex < 14 ? 'bg-blue-25 text-blue-900' : 'bg-green-25 text-green-900'
                    }`}
                  >
                    {String(item[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackDetailsPage;