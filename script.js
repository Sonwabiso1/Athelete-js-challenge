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
  const { firstName, surname, races } = athlete;
  const latestRace = races[races.length - 1];
  const date = new Date(latestRace.date);
  const totalMinutes = latestRace.time.reduce((a, b) => a + b, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const fragment = document.createDocumentFragment();
  const title = document.createElement('h2');
  title.textContent = id;  // Changed from `${firstName} ${surname}` to ID
  fragment.appendChild(title);

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

  fragment.appendChild(list);
  return fragment;
};

// Applying changes to the DOM
const athletes = data.response.data;
Object.entries(athletes).forEach(([key, athlete]) => {
  const element = document.querySelector(`[data-athlete="${key}"]`); // Changed to use data-athlete attribute
  if (element) {
    element.appendChild(createHtml(key, athlete));  // Now passing ID along with athlete data
  }
});