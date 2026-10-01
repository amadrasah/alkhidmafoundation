const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
});

function closeMobileMenu() {
    if (window.innerWidth < 768) {
        navMenu.classList.add('hidden');
        document.querySelectorAll('.dropdown-content').forEach(el => el.classList.add('hidden'));
    }
}

function toggleDropdown(event, dropdownId) {
    event.preventDefault();
    event.stopPropagation();
    const currentDropdown = document.getElementById(dropdownId);
    const isHidden = currentDropdown.classList.contains('hidden');
    document.querySelectorAll('.dropdown-content').forEach(el => el.classList.add('hidden'));
    if (isHidden) {
        currentDropdown.classList.remove('hidden');
    } else {
        currentDropdown.classList.add('hidden');
    }
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => sec.classList.add('hidden'));
    const target = document.getElementById(sectionId);
    if(target) {
        target.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' --> });
    }
}

// LocalStorage Data Management for Committee
let members = JSON.parse(localStorage.getItem('alkhidmahMembers')) || [
    { name: "মোঃ আব্দুর রহিম", role: "সভাপতি", phone: "০১৭০০০০০০০০" },
    { name: "মোঃ শফিকুল ইসলাম", role: "সাধারণ সম্পাদক", phone: "০১৮০০০০০০০০" }
];

function renderTable() {
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    members.forEach((m, index) => {
        tbody.innerHTML += `
            <tr class="hover:bg-gray-50">
                <td class="p-3">${index + 1}</td>
                <td class="p-3 font-medium">${m.name}</td>
                <td class="p-3">${m.role}</td>
                <td class="p-3">${m.phone}</td>
                <td class="p-3 text-center">
                    <button onclick="deleteMember(${index})" class="bg-rose-100 text-rose-700 px-2.5 py-1 rounded text-xs font-semibold hover:bg-rose-200">মুছে ফেলুন</button>
                </td>
            </tr>
        `;
    });
}

function addMember(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const phone = document.getElementById('phone').value;

    members.push({ name, role, phone });
    localStorage.setItem('alkhidmahMembers', JSON.stringify(members));

    document.getElementById('committeeForm').reset();
    renderTable();
    alert('সদস্য সফলভাবে যুক্ত হয়েছে!');
}

function deleteMember(index) {
    if(confirm('আপনি কি এই সদস্যকে তালিকা থেকে মুছে ফেলতে চান?')) {
        members.splice(index, 1);
        localStorage.setItem('alkhidmahMembers', JSON.stringify(members));
        renderTable();
    }
}

window.onload = function() {
    renderTable();
};
