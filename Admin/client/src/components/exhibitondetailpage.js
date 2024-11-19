import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Send, Filter, Download, Trash2, Search,Info, CheckCircle } from 'lucide-react';
import { exportToExcel, exportToCSV } from './exportUtils';

const ExhibitionDetailsPage = () => {
  const navigate = useNavigate();
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExhibitions, setSelectedExhibitions] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null); // Track which row is expanded

  const toggleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/exhibition`);
        setExhibitions(response.data);
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExhibitionSelection = (id) => {
    setSelectedExhibitions(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelectedExhibitions = () => {
    setExhibitions(prev => prev.filter(item => !selectedExhibitions.includes(item.id)));
    setSelectedExhibitions([]);
  };

  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = async (id, email, name) => {
    if (isLoading || isClicked) return;

    setIsLoading(true);
    try {
      console.log('Sending approval request:', {
        id,
        email,
        name
      });

      const response = await axios.post(
        'http://localhost:3000/exhibitionemail/sendexhibtion',
        {
          id,
          email: email.trim(),
          name: name.trim()
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Approval response:', response.data);
      
      if (response.data.message === 'Email sent successfully') {
        setIsClicked(true);
        // Optionally show success message
        alert('Approval email sent successfully!');
      }

    } catch (error) {
      console.error('Approval error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      let errorMessage = 'Failed to send the approval email.';
      if (error.response?.data?.error) {
        errorMessage += ` ${error.response.data.error}`;
      }
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  
  };


  const handleExportExhibitions = (format) => {
    const data = exhibitions.map(ex => ({
      HallDimension: ex.hallDimension,
      EnclosedHall: ex.isEnclosedHall,
      Darkened: ex.canBeDarkened,
      Cooling: ex.hasCooling,
      GroundFloor: ex.isGroundFloor,
      StorageSpace: ex.hasStorageSpace,
      PowerOutlets: ex.powerOutlets,
      NumTables: ex.numTables,
      VRSpace: ex.vrSpace,
      Wifi: ex.hasWifi,
      LectureHallArea: ex.lectureHallArea,
      SeatingCapacity: ex.seatingCapacity,
      AVFacilities: ex.hasAVFacilities,
      DistanceFromExhibition: ex.distanceFromExhibition,
      AccommodationProvided: ex.accommodationProvided,
      LocalTransportation: ex.localTransportation,
      SecureParkingSpace: ex.secureParkingSpace,
      ManpowerForLoading: ex.manpowerForLoading,
      ContactPersonName: ex.contactPersonName,
      ContactPersonMobile: ex.contactPersonMobile,
      ContactPersonEmail: ex.contactPersonEmail,
      VenueLocation: ex.venueLocation,
      TeacherInvitation: ex.teacherInvitation,
      TeacherRegistration: ex.teacherRegistration,
      WritingMaterialsProvided: ex.providesWritingMaterials,
      RefreshmentsProvided: ex.providesRefreshments,
      QuizForStudents: ex.quizForSchoolStudents,
      QuizTeamSelection: ex.quizTeamSelection,
      QuizArrangements: ex.quizArrangements,
      QuizRefreshments: ex.quizRefreshments
    }
  )
);


    if (format === 'excel') {
      exportToExcel(data, 'exhibitions');
    } else {
      exportToCSV(data, 'exhibitions');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        {error}
      </div>
    </div>
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

      <h1 className="text-4xl font-bold text-gray-800 mb-6">Exhibition Details</h1>
      <p className="text-gray-600 mb-8 text-lg">Manage exhibition details and records.</p>

      {/* Search and export options */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search exhibitions..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button className="p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition duration-300">
            <Filter size={20} />
          </button>
          <button
            onClick={() => handleExportExhibitions('excel')}
            className="bg-green-500 text-white p-2 rounded mr-2"
          >
            Export Exhibitions as Excel
          </button>
          <button
            onClick={() => handleExportExhibitions('csv')}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Export Exhibitions as CSV
          </button>

          {selectedExhibitions.length > 0 && (
            <button
              onClick={handleDeleteSelectedExhibitions}
              className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-300"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Exhibition Hall Details */}
      <div className="overflow-x-auto bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hall Dimension
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enclosed Hall
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Can Be Darkened
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cooling
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ground Floor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Storage Space
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exhibitions.map((ex) => (
              <React.Fragment key={ex.id}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.hallDimension}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.isEnclosedHall}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.canBeDarkened}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.hasCooling }</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.isGroundFloor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.hasStorageSpace}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
  <button
    onClick={() => toggleExpandRow(ex.id)}
    className="text-blue-600 hover:text-blue-900 flex items-center"
  >
    <Info size={16} />
  </button>
  <button
    onClick={() =>
      handleApprove(ex.id, ex.contactPersonEmail, ex.contactPersonName)
    }
    className={`px-3 py-2 rounded ${
      isClicked
        ? "bg-green-600 text-white cursor-not-allowed" // Applied when clicked
        : "text-green-600 hover:text-green-900"
    }`}
  >
    <CheckCircle size={16} />
  </button>
</div>

                  </td>
                </tr>

                {/* Dropdown Row for Additional Details */}
                {expandedRow === ex.id && (
                 <tr>
                 <td colSpan={4} className="bg-gray-50 px-6 py-4">
                   <div className="text-sm text-gray-700 space-y-4">
                     {/* Lecture Hall Details */}
                     <div>
                       <h3 className="text-lg font-semibold text-gray-900 mb-2">Lecture Hall Details</h3>
                       <p><strong>Lecture Hall Area:</strong> {ex.lectureHallArea}</p>
                       <p><strong>Seating Capacity:</strong> {ex.seatingCapacity}</p>
                       <p><strong>Has AC Facility:</strong> {ex.hasAVFacilities ? "Yes" : "No"}</p>
                       <p><strong>Distance from Exhibition:</strong> {ex.distanceFromExhibition}</p>
                     </div>
               
                     {/* Contact Person Details */}
                     <div>
                       <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Person Details</h3>
                       <p><strong>Name:</strong> {ex.contactPersonName}</p>
                       <p><strong>Mobile:</strong> {ex.contactPersonMobile}</p>
                       <p><strong>Email:</strong> {ex.contactPersonEmail}</p>
                       <p><strong>Venue Location:</strong> {ex.venueLocation}</p>
                     </div>
               
                     {/* Other Exhibition Details */}
                     <div>
                       <h3 className="text-lg font-semibold text-gray-900 mb-2">Other Exhibition Details</h3>
                       <p><strong>Invitation to Teacher:</strong> {ex.teacherInvitation}</p>
                       <p><strong>Number of Teachers Registered:</strong> {ex.teacherRegistration}</p>
                       <p><strong>Provides Writing Materials:</strong> {ex.providesWritingMaterials ? "Yes" : "No"}</p>
                       <p><strong>Provides Refreshments:</strong> {ex.providesRefreshments ? "Yes" : "No"}</p>
                     </div>
               
                     {/* Quiz Details */}
                     <div>
                       <h3 className="text-lg font-semibold text-gray-900 mb-2">Quiz Details</h3>
                       <p><strong>Quiz for School Students:</strong> {ex.quizForSchoolStudents}</p>
                       <p><strong>Max Participants for Quiz Team Selection:</strong> {ex.quizTeamSelection}</p>
                       <p><strong>Quiz Arrangements:</strong> {ex.quizArrangements}</p>
                       <p><strong>Provides Quiz Refreshments:</strong> {ex.quizRefreshments ? "Yes" : "No"}</p>
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
    </div>
  );
};

export default ExhibitionDetailsPage;

