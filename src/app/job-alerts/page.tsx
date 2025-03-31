// 'use client'

// import { useState } from 'react';
// import { useSession } from 'next-auth/react';
// import Link from 'next/link';
// import { 
//   AiOutlinePlus, 
//   AiOutlineEdit,
//   AiOutlineDelete,
//   AiOutlineSearch,
//   AiOutlineEnvironment,
//   AiOutlineClockCircle,
//   AiOutlineMail,
//   AiOutlineBell,
//   AiOutlineCheck,
//   AiOutlineClose
// } from 'react-icons/ai';
// import { CiBellOn } from 'react-icons/ci';

// export default function JobAlertsPage() {
//   const { data: session, status } = useSession();
//   const [isCreating, setIsCreating] = useState(false);
//   const [formData, setFormData] = useState({
//     keywords: '',
//     location: '',
//     jobType: 'all',
//     frequency: 'daily'
//   });

//   // Demo job alerts data - in a real app, you would fetch this from an API
//   const [jobAlerts, setJobAlerts] = useState([
//     {
//       id: '1',
//       keywords: 'React Developer',
//       location: 'Remote',
//       jobType: 'Full-time',
//       frequency: 'Daily',
//       dateCreated: '2025-03-20',
//       isActive: true,
//       lastSent: '2025-03-30',
//       matchCount: 12
//     },
//     {
//       id: '2',
//       keywords: 'Frontend Engineer',
//       location: 'San Francisco, CA',
//       jobType: 'All',
//       frequency: 'Weekly',
//       dateCreated: '2025-03-15',
//       isActive: true,
//       lastSent: '2025-03-28',
//       matchCount: 8
//     }
//   ]);
  
//   // Loading state
//   if (status === 'loading') {
//     return (
//       <div className="flex items-center justify-center min-h-[70vh]">
//         <div className="loading loading-spinner loading-lg text-primary"></div>
//       </div>
//     );
//   }
  
//   // Not logged in state
//   if (status !== 'authenticated') {
//     return (
//       <div className="min-h-[70vh] flex flex-col items-center justify-center">
//         <div className="card w-96 bg-base-100 shadow-xl">
//           <div className="card-body items-center text-center">
//             <h2 className="card-title text-2xl">Access Required</h2>
//             <p>Please log in to view and manage your job alerts.</p>
//             <div className="card-actions justify-center mt-4">
//               <Link href="/login" className="btn btn-primary">Login</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   // Handle form change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };
  
//   // Handle form submit
//   const handleSubmit = (e: any) => {
//     e.preventDefault();
    
//     // Add new alert
//     const newAlert = {
//       id: `${Date.now()}`,
//       keywords: formData.keywords,
//       location: formData.location || 'Any location',
//       jobType: formData.jobType === 'all' ? 'All' : formData.jobType,
//       frequency: formData.frequency.charAt(0).toUpperCase() + formData.frequency.slice(1),
//       dateCreated: new Date().toISOString().split('T')[0],
//       isActive: true,
//       lastSent: null,
//       matchCount: 0
//     };
    
//     setJobAlerts([newAlert, ...jobAlerts]);
//     setIsCreating(false);
//     setFormData({
//       keywords: '',
//       location: '',
//       jobType: 'all',
//       frequency: 'daily'
//     });
//   };
  
//   // Toggle alert status
//   const toggleAlertStatus = (alertId) => {
//     setJobAlerts(jobAlerts.map(alert => 
//       alert.id === alertId ? {...alert, isActive: !alert.isActive} : alert
//     ));
//   };
  
//   // Delete alert
//   const deleteAlert = (alertId) => {
//     setJobAlerts(jobAlerts.filter(alert => alert.id !== alertId));
//   };

//   return (
//     <div className="container mx-auto py-8 px-4 max-w-4xl">
//       <div className="flex flex-col md:flex-row items-center justify-between mb-6">
//         <div className="flex items-center gap-2 mb-4 md:mb-0">
//           <CiBellOn className="text-primary text-2xl" />
//           <h1 className="text-2xl font-bold">Job Alerts</h1>
//         </div>
        
//         <button 
//           className="btn btn-primary"
//           onClick={() => setIsCreating(!isCreating)}
//         >
//           {isCreating ? (
//             <>
//               <AiOutlineClose />
//               Cancel
//             </>
//           ) : (
//             <>
//               <AiOutlinePlus />
//               Create Alert
//             </>
//           )}
//         </button>
//       </div>
      
//       {isCreating && (
//         <div className="card bg-base-100 shadow-xl mb-6">
//           <div className="card-body">
//             <h2 className="card-title">Create Job Alert</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Keywords</span>
//                   </label>
//                   <input 
//                     type="text" 
//                     name="keywords"
//                     placeholder="Job title, skills, or keywords" 
//                     className="input input-bordered w-full" 
//                     value={formData.keywords}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
                
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Location</span>
//                   </label>
//                   <input 
//                     type="text" 
//                     name="location"
//                     placeholder="City, state, or 'Remote'" 
//                     className="input input-bordered w-full" 
//                     value={formData.location}
//                     onChange={handleChange}
//                   />
//                 </div>
                
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Job Type</span>
//                   </label>
//                   <select 
//                     name="jobType"
//                     className="select select-bordered w-full"
//                     value={formData.jobType}
//                     onChange={handleChange}
//                   >
//                     <option value="all">All Types</option>
//                     <option value="Full-time">Full-time</option>
//                     <option value="Part-time">Part-time</option>
//                     <option value="Contract">Contract</option>
//                     <option value="Internship">Internship</option>
//                   </select>
//                 </div>
                
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Alert Frequency</span>
//                   </label>
//                   <select 
//                     name="frequency"
//                     className="select select-bordered w-full"
//                     value={formData.frequency}
//                     onChange={handleChange}
//                   >
//                     <option value="daily">Daily</option>
//                     <option value="weekly">Weekly</option>
//                     <option value="immediate">Immediate</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div className="card-actions justify-end mt-6">
//                 <button type="submit" className="btn btn-primary">
//                   <AiOutlinePlus />
//                   Create Alert
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
      
//       {jobAlerts.length === 0 ? (
//         <div className="card bg-base-100 shadow-xl">
//           <div className="card-body items-center text-center py-12">
//             <div className="text-5xl text-gray-300 mb-4">
//               <CiBellOn />
//             </div>
//             <h2 className="card-title text-xl">No job alerts set up</h2>
//             <p>Create alerts to get notified when new jobs match your preferences.</p>
//             <div className="card-actions justify-center mt-4">
//               <button 
//                 className="btn btn-primary" 
//                 onClick={() => setIsCreating(true)}
//               >
//                 <AiOutlinePlus />
//                 Create First Alert
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {jobAlerts.map(alert => (
//             <div 
//               key={alert.id} 
//               className={`card bg-base-100 shadow-xl ${!alert.isActive ? 'opacity-75' : ''}`}
//             >
//               <div className="card-body p-6">
//                 <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <h2 className="card-title text-lg">{alert.keywords}</h2>
//                       {alert.isActive ? (
//                         <div className="badge badge-success gap-1">
//                           <AiOutlineCheck size={12} />
//                           Active
//                         </div>
//                       ) : (
//                         <div className="badge badge-ghost gap-1">
//                           <AiOutlineClose size={12} />
//                           Paused
//                         </div>
//                       )}
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-4 mt-3 text-sm">
//                       <div className="flex items-center gap-1">
//                         <AiOutlineEnvironment className="text-gray-500" />
//                         <span>{alert.location}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <AiOutlineClockCircle className="text-gray-500" />
//                         <span>{alert.jobType}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <AiOutlineMail className="text-gray-500" />
//                         <span>{alert.frequency} emails</span>
//                       </div>
//                     </div>
                    
//                     <div className="text-xs text-gray-500 mt-3">
//                       Created on {new Date(alert.dateCreated).toLocaleDateString()}
//                       {alert.lastSent && ` • Last sent ${new Date(alert.lastSent).toLocaleDateString()}`}
//                       {alert.matchCount > 0 && ` • ${alert.matchCount} matching jobs found`}
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-row gap-2 mt-4 md:mt-0">
//                     <button 
//                       className="btn btn-sm"
//                       onClick={() => toggleAlertStatus(alert.id)}
//                     >
//                       {alert.isActive ? 'Pause' : 'Activate'}
//                     </button>
//                     <Link 
//                       href={`/jobs?keywords=${encodeURIComponent(alert.keywords)}&location=${encodeURIComponent(alert.location)}`}
//                       className="btn btn-sm"
//                     >
//                       <AiOutlineSearch />
//                       View Jobs
//                     </Link>
//                     <button 
//                       className="btn btn-ghost btn-sm text-error" 
//                       onClick={() => deleteAlert(alert.id)}
//                     >
//                       <AiOutlineDelete />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
      
//       <div className="mt-8">
//         <div className="card bg-base-100 shadow">
//           <div className="card-body">
//             <h3 className="text-lg font-medium mb-2">About Job Alerts</h3>
//             <p className="text-sm text-gray-600">
//               Job alerts notify you when new positions match your search criteria. You'll receive emails based on your selected frequency with the latest matching jobs.
//             </p>
//             <div className="alert alert-info mt-4">
//               <AiOutlineBell className="text-lg" />
//               <span>Make sure to add <strong>alerts@apptit.com</strong> to your contacts to prevent alerts from going to spam.</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }