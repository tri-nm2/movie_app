export class ThongTinDangKy {
        taiKhoan = "";
        matKhau = "";
        email =  "";
        soDt = "";
        maNhom =  "GP00";
        hoTen = "";
        statusSignUp = false;

        constructor(taiKhoan ="", matKhau ="", email = "", soDt = "", hoTen = "", statusSignUp = false){
            this.taiKhoan = taiKhoan;
            this.matKhau = matKhau;
            this.email = email;
            this.soDt = soDt;
            this.hoTen = hoTen;
            this.statusSignUp = statusSignUp
        }
      
}