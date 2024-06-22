import React,{useState,useEffect} from 'react'

function ActivitiesList() {

    const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch('http://localhost:3001/api/activities');
      const data = await response.json();
      setActivities(data);
    };

    fetchActivities();
  }, []);


  return (
    <div>
      <h2>Extracurricular Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            <h3>{activity.activityName}</h3>
            <p>Type: {activity.activityType}</p>
            <p>Description: {activity.activityDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ActivitiesList