import React, { useState, useEffect, useCallback, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import PublishModal from './PublishModal';
import { Calendar as CalendarIcon, Users, Search, Filter, Download, Trash2,Info, CheckCircle } from 'lucide-react';
import { exportToExcel, exportToCSV } from './exportUtils';
import axios from 'axios';
import AdminCalendar from './AdminCalendar';



const VisitorDetailsPage = () => {
  const navigate = useNavigate();

  const [selectedDates, setSelectedDates] = useState([]);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishedLink, setPublishedLink] = useState('');
  const [activeTab, setActiveTab] = useState('calendar');
  const [searchTerm, setSearchTerm] = useState('');
  const [visitorData, setVisitorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [exportFormat, setExportFormat] = useState('excel'); 

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const slideIn = useSpring({
    transform: 'translateY(0)',
    from: { transform: 'translateY(50px)' },
  });

  const prepareDataForExport = useCallback(() => {
    return visitorData.map(item => ({
      'Institution Name': item.institutionName,
      'Branch': item.studentBranch,
      'Semester': item.studentSem,
      'Number of Students': item.numStudents,
      'Number of Faculty': item.numFaculty,
      'Contact Person': item.name,
      'Position': item.position,
      'Email': item.email,
      'Mobile': item.mobile,
      'Campus': item.campus.join(', '),
      'IPR Time': item.ipr_time,
      'FCIPT Time': item.fcipt_time,
      'Visit Date': new Date(item.visit_date).toLocaleDateString(),
      'Visit Time': item.visit_time,
      'Materials': item.materials.join(', ')
    }));
  }, [visitorData]);

  const handleExport = useCallback(() => {
    const data = prepareDataForExport();
    const filename = 'visitors_data';

    if (exportFormat === 'excel') {
      exportToExcel(data, filename);
    } else if (exportFormat === 'csv') {
      exportToCSV(data, filename);
    }
  }, [exportFormat, prepareDataForExport]);

  const toggleExpandRow = useCallback((id) => {
    setExpandedRow(expandedRow === id ? null : id);
  }, [expandedRow]);


  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/visitor');
      setVisitorData(response.data);
    } catch (error) {
      setFetchError(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

 
    const [isClicked, setIsClicked] = useState(false);
  
  const handleDeleteSelected = useCallback(() => {
    setVisitorData(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  }, [selectedItems]);

  const handleApprove = async (id, email) => {
    try {
      console.log('Sending request to:', 'http://localhost:3000/email/send');
      console.log('Request data:', { id, email });
      
      const response = await axios.post('http://localhost:3000/email/send', { id, email });
      console.log('Response:', response);

      if (!isClicked) {
        setIsClicked(true); // Disable the button after clicking
      }
      
    } catch (error) {
      console.log('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      alert('Failed to send the approval email.');
    }
  };

  const handleDelete = useCallback((id) => {
    setVisitorData(prev => prev.filter(item => item.id !== id));
  }, []);

  const filteredData = useMemo(() => {
    return visitorData.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [visitorData, searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  return (
    <animated.div style={fadeIn} className="container mx-auto px-4 py-8">
      <animated.div style={slideIn}>
        <div className="mb-8 flex justify-between items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center"
          >
            Back to Dashboard
          </button>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-6">Visitor's Form</h1>
        <p className="text-gray-600 mb-8 text-lg">Manage visitor information and schedule.</p>

        <div className="mb-8 flex space-x-4">
          {['calendar', 'visitors'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 px-4 rounded-md transition duration-200 ease-in-out ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'calendar' ? <CalendarIcon className="inline-block mr-2" size={20} /> : <Users className="inline-block mr-2" size={20} />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          {activeTab === 'calendar' && (
            <div>
              <AdminCalendar/>
            </div>
          )}

          {activeTab === 'visitors' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Visitor's Data</h2>
              <div className="mb-4 flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search visitors..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition duration-300 ease-in-out">
                  <Filter size={20} />
                </button>
                <select
                      className="appearance-none bg-green-100 text-green-700 font-semibold py-2 px-4 pr-8 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer transition duration-300 ease-in-out"
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value)}
                    >
                      <option value="excel">Excel</option>
                      <option value="csv">CSV</option>
               </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-700">
                </div>
                <button 
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition duration-300 ease-in-out flex items-center"
                  onClick={handleExport}
                >
                  <Download size={20} className="mr-2" />
                  <span>Export</span>
                </button>
                    
                {selectedItems.length > 0 && (
                  <button
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-300 ease-in-out"
                    onClick={handleDeleteSelected}
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              {fetchError ? (
               <div className="text-red-600 bg-red-100 p-4 rounded-md shadow">{fetchError}</div>
              ) : (
                filteredData.length > 0 ? (
                  <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. of Students</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. of Faculty</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData.map(item => (
                          <React.Fragment key={item.id}>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.institutionName}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.studentBranch}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.studentSem}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.numStudents}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.numFaculty}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(item.visit_date).toLocaleDateString()}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button onClick={() => toggleExpandRow(item.id)} className="text-blue-600 hover:text-blue-900 mr-2">
                                  <Info size={16} />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                                  <Trash2 size={16} />
                                </button>
                               <button
                                onClick={() => handleApprove(item.id, item.email)}
                                disabled={isClicked} // Disable the button if clicked
                                className={`ml-2 px-3 py-2 rounded ${
                                  isClicked
                                    ? "bg-green-600 text-white cursor-not-allowed" // Applied when clicked
                                    : "text-green-600 hover:text-green-900"
                                }`}
                              >
                                <CheckCircle size={16} />
                              </button>
                              </td>

                            </tr>
                            {expandedRow === item.id && (
                              <tr>
                                <td colSpan="8" className="px-6 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Group Incharge Details</h4>
                                      <p>Name: {item.name}</p>
                                      <p>Position: {item.position}</p>
                                      <p>Email: {item.email}</p>
                                      <p>Mobile: {item.mobile}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Visitor Arrival Details</h4>
                                      <p>Campus: {item.campus.join(', ')}</p>
                                      <p>IPR Time: {item.ipr_time}</p>
                                      <p>FCIPT Time: {item.fcipt_time}</p>
                                      <p>Visit Date: {new Date(item.visit_date).toLocaleDateString()}</p>
                                      <p>Visit Time: {item.visit_time}</p>
                                      <p>Materials: {item.materials.join(', ')}</p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-gray-600 p-4 rounded-md shadow">No visitors found.</div>
                )
              )}
            </div>
          )}
        </div>
        {isPublishModalOpen && (
          <PublishModal link={publishedLink} onClose={() => setIsPublishModalOpen(false)} />
        )}
      </animated.div>
    </animated.div>
  );
};

export default VisitorDetailsPage;