import {useState} from 'react'
import NavAdmin from "../NavAdmin";
import LinkCssJs_Admin from '../LinkCssJs_Admin'



function AddHomestay(){
    const [resourcesLoaded, setResourcesLoaded] = useState(false);
    
    return (
        <>
            <LinkCssJs_Admin onLoaded={() => setResourcesLoaded(true)}/>

            {resourcesLoaded && (
                <>
                    <NavAdmin/>

                    <div class="content-wrapper">
                        <div class="container-fluid">
                            {/* Breadcrumbs */}
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="#">Dashboard</a>
                                </li>
                                <li class="breadcrumb-item active">My Dashboard</li>
                            </ol>

                            <form method="get">
                                <h1>Thêm Homestay</h1>

                                <div className="form-row">
                                    <p>Mã Homestay</p>
                                    <input type="text" name='mahomestay'/>
                                </div>

                                <div className="form-row">
                                    <p>Tên Homestay</p>
                                    <input type="text" name='tenhomestay'/>
                                </div>

                                <div className="form-row">
                                    <p>Địa điểm</p>
                                    <select name="diadiem">
                                        <option value="">Chọn địa điểm</option>
                                        <option value="tphcm">TP.Hồ Chí Minh</option>
                                        <option value="bentre">Bến Tre</option>
                                        <option value="dalat">Đà Lạt</option>
                                        <option value="vungtau">Vũng Tàu</option>
                                        <option value="phanthiet">Phan Thiết</option>
                                    </select>
                                </div>

                                <div className="form-row">
                                    <p>Địa chỉ</p>
                                    <input type="text" name='diachi'/>
                                </div>

                                <div className="form-row">
                                    <p>Hình đại diện</p>
                                    <input type="file" name="hinhdaidien"/>
                                </div>

                                <div className="form-row">
                                    <p>Album hình</p>
                                    <input type="file" name="albumhinh" multiple/>
                                </div>

                                <div className="form-row">
                                    <p>Chất lượng</p>
                                    <select name="chatluong">
                                        <option value="">Chọn chất lượng</option>
                                        <option value="cao">Cao</option>
                                        <option value="tot">Tốt</option>
                                        <option value="trungbinh">Trung bình</option>
                                    </select>
                                </div>

                                <div className="form-row">
                                    <p>Giá tiền</p>
                                    <input type="number" name='giatien'/>
                                </div>

                                <div className="form-row">
                                    <p>Sức chứa</p>
                                    <input type="number" name='giatien'/>
                                </div>

                                <div className="form-row">
                                    <p>Quản lý homestay</p>
                                    <input type="text" name='quanly'/>
                                </div>

                                <div className="form-row">
                                    <p>SĐT</p>
                                    <input type="text" name='sdt'/>
                                </div>

                                <div className="btn-submit">
                                    <input type="submit" value="Thêm" />
                                </div>

                                

                            </form>

                            


                        </div>
                    </div>

                </>
            )}

            
            
        
        </>
    )
}

export default AddHomestay;