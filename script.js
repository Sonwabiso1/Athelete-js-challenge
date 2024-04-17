const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const data = {
  response: {
    requestType: "FETCH_ATHLETE_DATA",
    requestBy: "ALL_MATCHING_ATHLETES",
    forDisplay: "BEST_RACES",

    data: {
      NM372: {
        firstName: "Nwabisa",
        surname: "Masiko",
        id: "NM372",
        races: [
          {
            date: '2022-11-18T20:00:00.000Z',
            time: [9, 7, 8, 6],
          },
          {
            date: '2022-12-02T20:00:00.000Z',
            time: [6, 7, 8, 7],
          },
        ],
      },

      SV782: {
        firstName: "Schalk",
        surname: "Venter",
        id: "SV782",
        races: [
          {
            date: '2022-11-18T20:00:00.000Z',
            time: [10, 8, 3, 12],
          },
          {
            date: '2022-11-25T20:00:00.000Z',
            time: [6, 8, 9, 11],
          },
          {
            date: '2022-12-02T20:00:00.000Z',
            time: [10, 11, 4, 8],
          },
          {
            date: '2022-12-09T20:00:00.000Z',
            time: [9, 8, 9, 11],
          },
        ],
      },
    },
  },
};

// Only edit below this comment

const createHtml = (id, athlete) => {
  // Extract relevant data from the athlete object
  const { firstName, surname, races } = athlete;
  
  // Select the most recent race for displaying latest race details
  const latestRace = races[races.length - 1];
  const date = new Date(latestRace.date);
  
  // Calculate the total time in minutes from the latest race's time array
  const totalMinutes = latestRace.time.reduce((a, b) => a + b, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Create a document fragment to hold the elements
  const fragment = document.createDocumentFragment();

  // Create and append the heading with the athlete's ID
  const title = document.createElement('h2');
  title.textContent = id; // Use the athlete's ID as the header text
  fragment.appendChild(title);

  // Create and fill in the details list (dl) with athlete data
  const list = document.createElement('dl');
  list.innerHTML = /* html */ `
    <dt>Athlete</dt>
    <dd>${firstName} ${surname}</dd>

    <dt>Total Races</dt>
    <dd>${races.length}</dd>

    <dt>Event Date (Latest)</dt>
    <dd>${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}</dd>

    <dt>Total Time (Latest)</dt>
    <dd>${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}</dd>
  `;

  // Append the details list to the fragment
  fragment.appendChild(list);

  // Return the complete document fragment ready for DOM insertion
  return fragment;
};

// Apply changes to the DOM by appending created HTML for each athlete
const athletes = data.response.data;
Object.entries(athletes).forEach(([key, athlete]) => {
  // Find the corresponding section element by athlete ID
  const element = document.querySelector(`[data-athlete="${key}"]`);
  if (element) {
    // Append the created HTML to the selected element
    element.appendChild(createHtml(key, athlete));
  }
});