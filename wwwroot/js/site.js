//// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
//// for details on configuring this project to bundle and minify static web assets.

//// Write your JavaScript code.
////Home/Index
//let allFiles = [];
//let isGridView = true;

//async function uploadFile() {
//    const input = document.getElementById('fileInput');
//    if (!input.files[0]) {
//        showAlert('Please select a file to upload.');
//        return;
//    }

//    const formData = new FormData();
//    formData.append('file', input.files[0]);

//    try {
//        const response = await fetch('/api/location/upload', {
//            method: 'POST',
//            body: formData
//        });

//        if (response.ok) {
//            showAlert('File uploaded successfully.');
//            loadFiles();
//        } else {
//            const errorData = await response.json();
//            showAlert(`Failed to upload file. Error: ${errorData.message}`);
//        }
//    } catch (error) {
//        showAlert(`Failed to upload file. Error: ${error.message}`);
//    }
//}

//async function loadFiles() {
//    try {
//        const response = await fetch('/api/location/files');
//        if (response.ok) {
//            allFiles = await response.json();
//            displayFiles(allFiles);
//            updateFileCount(allFiles.length);
//        } else {
//            const errorData = await response.json();
//            showAlert(`Failed to load files. Error: ${errorData.message}`);
//        }
//    } catch (error) {
//        showAlert(`Failed to load files. Error: ${error.message}`);
//    }
//}

//function displayFiles(files) {
//    const fileList = document.getElementById('fileList');
//    fileList.innerHTML = '';
//    files.forEach(file => {
//        const li = document.createElement('li');
//        const a = document.createElement('a');
//        a.textContent = file;
//        a.href = `/api/location/download/${file}`;
//        a.target = '_blank';
//        a.onmouseover = () => showFileUrl(a.href);
//        a.onmouseout = () => hideFileUrl();
//        li.appendChild(a);
//        if (!isGridView) {
//            li.classList.add('list-view-item');
//        }
//        fileList.appendChild(li);
//    });
//}

//function filterFiles() {
//    const searchInput = document.getElementById('searchInput').value.toLowerCase();
//    const filteredFiles = allFiles.filter(file => file.toLowerCase().includes(searchInput));
//    displayFiles(filteredFiles);
//}

//function setListView() {
//    isGridView = false;
//    document.getElementById('fileList').classList.remove('grid-view');
//    document.getElementById('fileList').classList.add('list-view');
//    displayFiles(allFiles);
//}

//function setGridView() {
//    isGridView = true;
//    document.getElementById('fileList').classList.remove('list-view');
//    document.getElementById('fileList').classList.add('grid-view');
//    displayFiles(allFiles);
//}

//function updateFileCount(count) {
//    document.getElementById('fileCount').textContent = `Total files: ${count}`;
//}

//async function downloadFile(fileName) {
//    try {
//        const response = await fetch(`/api/location/download/${fileName}`);
//        if (response.ok) {
//            const blob = await response.blob();
//            const url = window.URL.createObjectURL(blob);
//            const a = document.createElement('a');
//            a.style.display = 'none';
//            a.href = url;
//            a.download = fileName;
//            document.body.appendChild(a);
//            a.click();
//            window.URL.revokeObjectURL(url);
//        } else {
//            const errorData = await response.json();
//            showAlert(`Failed to download file. Error: ${errorData.message}`);
//        }
//    } catch (error) {
//        showAlert(`Failed to download file. Error: ${error.message}`);
//    }
//}

//function showAlert(message) {
//    const alertBox = document.getElementById('alert');
//    alertBox.textContent = message;
//    alertBox.style.display = 'block';
//    setTimeout(() => {
//        alertBox.style.display = 'none';
//    }, 5000);
//}

//function showFileUrl(url) {
//    const tooltip = document.createElement('div');
//    tooltip.classList.add('tooltip');
//    tooltip.textContent = url;

//    tooltip.style.position = 'fixed';
//    tooltip.style.left = '10px';
//    tooltip.style.bottom = '10px';

//    document.body.appendChild(tooltip);
//    window.currentTooltip = tooltip;
//}

//function hideFileUrl() {
//    if (window.currentTooltip) {
//        document.body.removeChild(window.currentTooltip);
//        window.currentTooltip = null;
//    }
//}

//function exportToExcel() {
//    let csvContent = "data:text/csv;charset=utf-8,File name,Url download\n";
//    allFiles.forEach(file => {
//        const row = `${file},${window.location.origin}/api/location/download/${file}\n`;
//        csvContent += row;
//    });

//    const encodedUri = encodeURI(csvContent);
//    const link = document.createElement("a");
//    const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
//    link.setAttribute("href", encodedUri);
//    link.setAttribute("download", `data_${timestamp}.csv`);
//    document.body.appendChild(link);
//    link.click();
//    document.body.removeChild(link);
//}

//loadFiles();
// Định nghĩa một hàm để hiển thị thông báo
function showToast(type, message, title) {
    let options = {
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
        preventDuplicates: true,
        positionClass: 'toast-top-right',
        timeOut: 4000,
        extendedTimeOut: 1000
    };

    switch (type) {
        case 'success':
            toastr.success(message, title, options);
            break;
        case 'error':
            toastr.error(message, title, options);
            break;
        case 'info':
            toastr.info(message, title, options);
            break;
        case 'warning':
            toastr.warning(message, title, options);
            break;
    }
}
//Login
//Hide and show pass
function viewPassword() {
    const passwordInput = document.getElementById('PassWord');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    document.querySelector('.toggle-password').textContent = type === 'password' ? '👁️' : '🙈';
}//Post login
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const url = form.action;
    const returnUrl = document.getElementById('returnUrl').value;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'RequestVerificationToken': form.querySelector('input[name="__RequestVerificationToken"]').value
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        if (responseData.success === true) {
            showToast('success', responseData.message, responseData.statuscode);
            setTimeout(function () {
                window.location.href = responseData.returnUrl;
            }, 1000);
        } else {
            showToast('error', responseData.message, responseData.statuscode);
            setTimeout(function () {
                window.location.href = responseData.returnUrl;
            }, 3000);
        }
    } catch (error) {
        showToast('error', 'An error occurred: ' + error.message, 'Error');
        setTimeout(function () {
            location.reload();
        }, 5000);
    }
});