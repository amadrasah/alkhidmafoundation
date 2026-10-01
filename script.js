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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// LocalStorage Management for All Lists
let allData = JSON.parse(localStorage.getItem('alkhidmahAllData')) || {
    committee: [
        { name: "মোঃ আব্দুর রহিম", role: "সভাপতি", phone: "০১৭০০০০০০০০" },
        { name: "মোঃ শফিকুল ইসলাম", role: "সাধারণ সম্পাদক", phone: "০১৮০০০০০০০০" }
    ],
    advisors: [
        { name: "অধ্যাপক ড. মোঃ নজরুল ইসলাম", role: "প্রধান উপদেষ্টা", phone: "০১৯০০০০০০০০" }
    ],
    members: [
        { name: "মোঃ রফিকুল ইসলাম", role: "সাধারণ সদস্য", phone: "০১৫০০০০০০০০" }
    ]
};

function renderAllTables() {
    renderTableSection('committee', 'committeeTableBody');
    renderTableSection('advisors', 'advisorsTableBody');
    renderTableSection('members', 'membersTableBody');
}

function renderTableSection(category, tbodyId) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    tbody.innerHTML = '';
    
    const items = allData[category];
    if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-gray-400 text-sm">কোনো তথ্য নেই</td></tr>`;
        return;
    }

    items.forEach((item, index) => {
        tbody.innerHTML += `
            <tr class="hover:bg-gray-50">
                <td class="p-3">${index + 1}</td>
                <td class="p-3 font-medium">${item.name}</td>
                <td class="p-3">${item.role}</td>
                <td class="p-3">${item.phone}</td>
                <td class="p-3 text-center">
                    <button onclick="deleteItem('${category}', ${index})" class="bg-rose-100 text-rose-700 px-2.5 py-1 rounded text-xs font-semibold hover:bg-rose-200">মুছে ফেলুন</button>
                </td>
            </tr>
        `;
    });
}

function addUniversalMember(e) {
    e.preventDefault();
    const category = document.getElementById('categorySelect').value;
    const name = document.getElementById('memberName').value;
    const role = document.getElementById('memberRole').value;
    const phone = document.getElementById('memberPhone').value;

    allData[category].push({ name, role, phone });
    localStorage.setItem('alkhidmahAllData', JSON.stringify(allData));

    document.getElementById('globalMemberForm').reset();
    renderAllTables();
    alert('সফলভাবে সংশ্লিষ্ট তালিকায় যুক্ত হয়েছে!');
}

function deleteItem(category, index) {
    if(confirm('আপনি কি এই সদস্যকে তালিকা থেকে মুছে ফেলতে চান?')) {
        allData[category].splice(index, 1);
        localStorage.setItem('alkhidmahAllData', JSON.stringify(allData));
        renderAllTables();
    }
}

window.onload = function() {
    renderAllTables();
};
