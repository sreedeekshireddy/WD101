let form = document.getElementById("user_form");
const retrievingentries = () => {
  let entries = localStorage.getItem("user_entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let userEntries = retrievingentries();
const display_entries = () => {
  const entries = retrievingentries();
  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
      const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
      const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
      const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
      const acceptTermsCell = `<td class='border px-4 py-2'>${entry.accepterTerms}</td>`;
      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
      return row;
    })
    .join("\n");
  const table = `<table class="table-auto w-full"><tr>
    <th class="px-6 py-3">Name</th>
    <th class="px-6 py-3">Email</th>
    <th class="px-6 py-3">Password</th>
    <th class="px-6 py-3">Dob</th>
    <th class="px-6 py-3">Accepted terms?</th>
    </tr>${tableEntries}</table>`;
  let details = document.getElementById("user_entries");
  details.innerHTML = table;
};

const savingentries = (x) => {
    x.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const accepterTerms = document.getElementById("acceptTerms").checked;
    const entry = {
      name,
      email,
      password,
      dob,
      accepterTerms,
    };
    userEntries.push(entry);
    localStorage.setItem("user_entries", JSON.stringify(userEntries));
    display_entries();
};

form.addEventListener("submit", savingentries);
console.log(document.getElementById("name").value);
display_entries();

const today = new Date();
const min = new Date(
  today.getFullYear() - 55,
  today.getMonth(),
  today.getDate()
);
const max = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
);
dob.setAttribute("min", min.toISOString().slice(0, 10));
dob.setAttribute("max", max.toISOString().slice(0, 10));
dob.addEventListener("change", () => {
  const age = Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e10);
  if (age < 18 || age > 55) {
    dob.setCustomValidity("Please enter age between 18 & 55");
  } else {
    dob.setCustomValidity("");
  }
});
