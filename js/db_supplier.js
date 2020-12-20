// Initialize Firebase
var firebaseConfig = {
	apiKey: "AIzaSyC6FHTUjVomTT9SeXAIBvB6FpFCxBbNo2Q",
	authDomain: "holoprint-myid.firebaseapp.com",
	databaseURL: "https://holoprint-myid.firebaseio.com",
	projectId: "holoprint-myid",
	storageBucket: "holoprint-myid.appspot.com",
	messagingSenderId: "571016780167",
	appId: "1:571016780167:web:458873e07d4cfdfa1e9b22",
	measurementId: "G-JL30S2DLXP"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Menampilkan data dalam bentuk tabel
function tampilData() {

	// Buat referensi database firebase
	var dbRef = firebase.database();
	var statusSupplier = dbRef.ref("status-Supplier");

	// Dapatkan referensi table
	var table = document.getElementById("tabel-status-Supplier").getElementsByTagName('tbody')[0];

	// Membuang semua isi table	
	$("#tabel-status-Supplier").find("tr:gt(0)").remove();

	// Memuat Data
	statusSupplier.on("child_added", function (data, prevChildKey) {
		var newstatusSupplier = data.val();

		var row = table.insertRow(table.rows.length);

		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);

		cell1.innerHTML = newstatusSupplier.id;
		cell2.innerHTML = newstatusSupplier.nama_Supplier;
		cell3.innerHTML = newstatusSupplier.alamat;
		cell4.innerHTML = newstatusSupplier.kontak;
		cell5.innerHTML = '<a class="btn btn-success btn-sm" href="https://wa.me/message/2TLDXPYLCZ4FG1" target="_blank">Hubungi</a> <button class="btn btn-primary btn-sm" type="button" id="update_data" onclick="updateData_Tampil(' + newstatusSupplier.id + ')" data-toggle="modal" data-target="#ModalUpdate">Update</button><button class="btn btn-danger btn-sm" type="button" id="delete_data" onclick="deleteData_Tampil(' + newstatusSupplier.id + ')" data-toggle="modal" data-target="#ModalDel" style="margin-left:10px;">Hapus</button>';
	});

}

// Melakukan proses pencarian data
function CariData() {
	// Ambil isi text pencarian
	var nama_Supplier_cari = $('#text_cari').val();

	// Buat referensi database firebase
	var dbRef = firebase.database();
	var statusSupplier = dbRef.ref("status-Supplier");


	// // Ambil data nama_Supplier sama persis isi text cari
	// var query = statusSupplier
	// 				.orderByChild('nama_Supplier')
	// 				.equalTo(nama_Supplier_cari)
	// 				.limitToFirst(1);


	// // Ambil data nama_Supplier huruf depan (dan selebihnya) isi text cari dilimit 1 data saja
	// var query = statusSupplier
	// 				.orderByChild('nama_Supplier')
	// 				.startAt(nama_Supplier_cari)
	// 				.endAt(nama_Supplier_cari + "\uf8ff")
	// 				.limitToFirst(1);


	// Ambil data nama_Supplier huruf depan (dan selebihnya) isi text cari
	var query = statusSupplier
		.orderByChild('nama_Supplier')
		.startAt(nama_Supplier_cari)
		.endAt(nama_Supplier_cari + "\uf8ff");


	// Dapatkan referensi table
	var table = document.getElementById("tabel-status-Supplier").getElementsByTagName('tbody')[0];

	// Membuang semua isi table	
	$("#tabel-status-Supplier").find("tr:gt(0)").remove();

	// Memuat Data pencarian

	query.on("child_added", function (snapshot) {

		var childData = snapshot.val();
		console.log(childData);

		var row = table.insertRow(table.rows.length);

		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);

		cell1.innerHTML = childData.id;
		cell2.innerHTML = childData.nama_Supplier;
		cell3.innerHTML = childData.alamat;
		cell4.innerHTML = childData.kontak;
		cell5.innerHTML = '<button class="btn btn-primary btn-sm" type="button" id="update_data" onclick="updateData_Tampil(' + childData.id + ')" data-toggle="modal" data-target="#ModalUpdate">Update</button><button class="btn btn-danger btn-sm" type="button" id="delete_data" onclick="deleteData_Tampil(' + childData.id + ')" style="margin-left:10px;"data-toggle="modal" data-target="#ModalDel">Hapus</button>';
	});

}

// Menampilkan data yang akan di update kedalam modal update
function updateData_Tampil(id) {
	$('#T4').val(id);

	var dbRef_update_tampil = firebase.database();
	var statusSupplierdenganID = dbRef_update_tampil.ref("status-Supplier/" + id);

	statusSupplierdenganID.on("value", function (snapshot) {
		var childData = snapshot.val();
		$('#t4_nama_Supplier').val(childData.nama_Supplier);
		$('#t4_alamat').val(childData.alamat);
		$('#t4_kontak').val(childData.kontak);
	});

}

// Melakukan proses update data
function updateData_Proses() {
	var id_update_proses = $('#T4').val();
	var nama_Supplier_update_proses = $('#t4_nama_Supplier').val();
	var alamat_update_proses = $('#t4_alamat').val();
	var kontak_update_proses = $('#t4_kontak').val();
	var kode_Supplier_update_proses = $('#t4_kode_Supplier').val();

	var dbRef_update_proses = firebase.database();
	var update_statusSupplier = dbRef_update_proses.ref("status-Supplier/" + id_update_proses);

	update_statusSupplier.update({
		"nama_Supplier": nama_Supplier_update_proses,
		"alamat": alamat_update_proses,
		"kontak": parseInt(kontak_update_proses),
		"kode_Supplier": kode_Supplier_update_proses
	});

	$('#ModalUpdate').modal('hide');
	tampilData();
}

// Mengambil id terakhir dan membahkan dengan 1 dan memasukkan kedalam text id di modal tambah
function ambilDataTerakhir() {

	$('#t4_nama_Supplier_add').val("");
	$('#t4_alamat_add').val("");
	$('#t4_kontak_add').val("");

	var dbRef_ambilDataTerakhir = firebase.database();
	var cariAkhir = dbRef_ambilDataTerakhir.ref("status-Supplier");
	cariAkhir.limitToLast(1).on('child_added', function (dataAkhir) {
		var snap = dataAkhir.val();
		var id_record_terakhir = snap.id + 1;
		document.getElementById("T4_add").value = id_record_terakhir;
	});

}

// Melakukan proses penamSupplier data
function addData_Proses() {
	var id_add_proses = $('#T4_add').val();
	var nama_Supplier_add_proses = $('#t4_nama_Supplier_add').val();
	var alamat_add_proses = $('#t4_alamat_add').val();
	var kontak_add_proses = $('#t4_kontak_add').val();

	var dbRef_add_proses = firebase.database();

	// Isikan data kedalam firebase
	var statusSupplier = dbRef_add_proses.ref("status-Supplier/" + id_add_proses);

	statusSupplier.set({

		id: parseInt(id_add_proses),
		nama_Supplier: nama_Supplier_add_proses,
		alamat: alamat_add_proses,
		kontak: kontak_add_proses

	});

	$('#ModalAdd').modal('hide');
	tampilData();
}

// Melakukan proses delete data yang telah dikonfirmasi sebelumnya
function delData_Proses() {
	var id_add_proses = $('#T4_del').val();

	var dbRef_delete = firebase.database();
	var statusSupplier = dbRef_delete.ref("status-Supplier/" + id_add_proses);
	statusSupplier.remove();
	$('#ModalDel').modal('hide');
	tampilData();


}

// Memasukkan id ke textbox di modal konfirmasi delete
function deleteData_Tampil(id) {
	$('#T4_del').val(id);
}