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
	var statusBahan = dbRef.ref("status-Bahan");

	// Dapatkan referensi table
	var table = document.getElementById("tabel-status-Bahan").getElementsByTagName('tbody')[0];

	// Membuang semua isi table	
	$("#tabel-status-Bahan").find("tr:gt(0)").remove();

	// Memuat Data
	statusBahan.on("child_added", function (data, prevChildKey) {
		var newstatusBahan = data.val();

		var row = table.insertRow(table.rows.length);

		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);

		cell1.innerHTML = newstatusBahan.id;
		cell2.innerHTML = newstatusBahan.nama_bahan;
		cell3.innerHTML = newstatusBahan.jenis;
		cell4.innerHTML = newstatusBahan.stock;
		cell5.innerHTML = newstatusBahan.kode_supplier;
		cell6.innerHTML = '<button class="btn btn-primary btn-sm" type="button" id="update_data" onclick="updateData_Tampil(' + newstatusBahan.id + ')" data-toggle="modal" data-target="#ModalUpdate">Update</button><button class="btn btn-danger btn-sm" type="button" id="delete_data" onclick="deleteData_Tampil(' + newstatusBahan.id + ')" data-toggle="modal" data-target="#ModalDel" style="margin-left:10px;">Hapus</button>';
	});

}

// Melakukan proses pencarian data
function CariData() {
	// Ambil isi text pencarian
	var nama_bahan_cari = $('#text_cari').val();

	// Buat referensi database firebase
	var dbRef = firebase.database();
	var statusBahan = dbRef.ref("status-Bahan");


	// // Ambil data nama_bahan sama persis isi text cari
	// var query = statusBahan
	// 				.orderByChild('nama_bahan')
	// 				.equalTo(nama_bahan_cari)
	// 				.limitToFirst(1);


	// // Ambil data nama_bahan huruf depan (dan selebihnya) isi text cari dilimit 1 data saja
	// var query = statusBahan
	// 				.orderByChild('nama_bahan')
	// 				.startAt(nama_bahan_cari)
	// 				.endAt(nama_bahan_cari + "\uf8ff")
	// 				.limitToFirst(1);


	// Ambil data nama_bahan huruf depan (dan selebihnya) isi text cari
	var query = statusBahan
		.orderByChild('nama_bahan')
		.startAt(nama_bahan_cari)
		.endAt(nama_bahan_cari + "\uf8ff");


	// Dapatkan referensi table
	var table = document.getElementById("tabel-status-Bahan").getElementsByTagName('tbody')[0];

	// Membuang semua isi table	
	$("#tabel-status-Bahan").find("tr:gt(0)").remove();

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
		var cell6 = row.insertCell(5);

		cell1.innerHTML = childData.id;
		cell2.innerHTML = childData.nama_bahan;
		cell3.innerHTML = childData.jenis;
		cell4.innerHTML = childData.stock;
		cell5.innerHTML = childData.kode_supplier;
		cell6.innerHTML = '<button class="btn btn-primary btn-sm" type="button" id="update_data" onclick="updateData_Tampil(' + childData.id + ')" data-toggle="modal" data-target="#ModalUpdate">Update</button><button class="btn btn-danger btn-sm" type="button" id="delete_data" onclick="deleteData_Tampil(' + childData.id + ')" style="margin-left:10px;"data-toggle="modal" data-target="#ModalDel">Hapus</button>';
	});

}

// Menampilkan data yang akan di update kedalam modal update
function updateData_Tampil(id) {
	$('#T4').val(id);

	var dbRef_update_tampil = firebase.database();
	var statusBahandenganID = dbRef_update_tampil.ref("status-Bahan/" + id);

	statusBahandenganID.on("value", function (snapshot) {
		var childData = snapshot.val();
		$('#t4_nama_bahan').val(childData.nama_bahan);
		$('#t4_jenis').val(childData.jenis);
		$('#t4_stock').val(childData.stock);
		$('#t4_kode_supplier').val(childData.kode_supplier);
	});

}

// Melakukan proses update data
function updateData_Proses() {
	var id_update_proses = $('#T4').val();
	var nama_bahan_update_proses = $('#t4_nama_bahan').val();
	var jenis_update_proses = $('#t4_jenis').val();
	var stock_update_proses = $('#t4_stock').val();
	var kode_supplier_update_proses = $('#t4_kode_supplier').val();

	var dbRef_update_proses = firebase.database();
	var update_statusBahan = dbRef_update_proses.ref("status-Bahan/" + id_update_proses);

	update_statusBahan.update({
		"nama_bahan": nama_bahan_update_proses,
		"jenis": jenis_update_proses,
		"stock": parseInt(stock_update_proses),
		"kode_supplier": kode_supplier_update_proses
	});

	$('#ModalUpdate').modal('hide');
	tampilData();
}

// Mengambil id terakhir dan membahkan dengan 1 dan memasukkan kedalam text id di modal tambah
function ambilDataTerakhir() {

	$('#t4_nama_bahan_add').val("");
	$('#t4_jenis_add').val("");
	$('#t4_stock_add').val("");
	$('#t4_kode_supplier_add').val("");

	var dbRef_ambilDataTerakhir = firebase.database();
	var cariAkhir = dbRef_ambilDataTerakhir.ref("status-Bahan");
	cariAkhir.limitToLast(1).on('child_added', function (dataAkhir) {
		var snap = dataAkhir.val();
		var id_record_terakhir = snap.id + 1;
		document.getElementById("T4_add").value = id_record_terakhir;
	});

}

// Melakukan proses penambahan data
function addData_Proses() {
	var id_add_proses = $('#T4_add').val();
	var nama_bahan_add_proses = $('#t4_nama_bahan_add').val();
	var jenis_add_proses = $('#t4_jenis_add').val();
	var stock_add_proses = $('#t4_stock_add').val();
	var kode_supplier_add_proses = $('#t4_kode_supplier_add').val();

	var dbRef_add_proses = firebase.database();

	// Isikan data kedalam firebase
	var statusBahan = dbRef_add_proses.ref("status-Bahan/" + id_add_proses);

	statusBahan.set({

		id: parseInt(id_add_proses),
		kode_supplier: kode_supplier_add_proses,
		nama_bahan: nama_bahan_add_proses,
		jenis: jenis_add_proses,
		stock: parseInt(stock_add_proses)

	});

	$('#ModalAdd').modal('hide');
	tampilData();
}

// Popup Bayar

function bayar() {
	var txt;
	var nom = 10000;
	if (confirm("Nominal Pemabayran anda " + nom)) {
		txt = "You pressed OK!";
	} else {
		txt = "You pressed Cancel!";
	}
	document.getElementById("demo").innerHTML = txt;
}

// Melakukan proses delete data yang telah dikonfirmasi sebelumnya
function delData_Proses() {
	var id_add_proses = $('#T4_del').val();

	var dbRef_delete = firebase.database();
	var statusBahan = dbRef_delete.ref("status-Bahan/" + id_add_proses);
	statusBahan.remove();
	$('#ModalDel').modal('hide');
	tampilData();


}

// Memasukkan id ke textbox di modal konfirmasi delete
function deleteData_Tampil(id) {
	$('#T4_del').val(id);
}