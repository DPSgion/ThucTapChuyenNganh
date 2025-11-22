import {useState} from 'react'
import NavAdmin from "../NavAdmin";
import LinkCssJs_Admin from '../LinkCssJs_Admin'

function AddVehicle(){

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
                                <h1>Thêm Xe</h1>

                                <div className="form-row">
                                    <p>Mã Xe</p>
                                    <input type="text" name='maxe'/>
                                </div>

                                <div className="form-row">
                                    <p>Tên Xe</p>
                                    <input type="text" name='tenxe'/>
                                </div>

                                <div className="form-row">
                                    <p>Chất lượng xe</p>
                                    <select name="chatluong">
                                        <option value="thehemoi">Thế hệ mới</option>
                                        <option value="thehecu">Thế hệ cũ</option>
                                        
                                    </select>
                                </div>

                                <div className="form-row">
                                    <p>Số lượng chỗ</p>
                                    <input type="number" name='soluongcho'/>
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
                                    <p>Tài xế</p>
                                    <input type="text" name='taixe'/>
                                </div>

                                <div className="form-row">
                                    <p>SĐT</p>
                                    <input type="text" name='sdt'/>
                                </div>

                                <div className="form-row">
                                    <p>Biển số</p>
                                    <input type="text" name='bienso'/>
                                </div>

                                <div className="form-row">
                                    <p>Trạng thái</p>
                                    <select name="trangthai">
                                        <option value="0">Sẵn sàng</option>
                                        <option value="1">Đang đi tour</option>
                                        <option value="2">Bảo trì</option>
                                    </select>
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

export default AddVehicle;