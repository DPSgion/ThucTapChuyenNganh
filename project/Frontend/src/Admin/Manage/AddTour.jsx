import LinkCssJs_Admin from '../LinkCssJs_Admin'
import { useState, useEffect } from 'react';
import NavAdmin from "../NavAdmin";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const addOneDay = (date) => {
    if (!date) return null;
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);  // +1 ngày
    return newDate;
};



function AddTour(){
    const [resourcesLoaded, setResourcesLoaded] = useState(false);

    const [ngayDi, setNgayDi] = useState("");
    const [ngayVe, setNgayVe] = useState("");

    const [duration, setDuration] = useState(0);

    const calcDuration = (start, end) => {
        if (!start || !end) return;

        const diffTime = end.getTime() - start.getTime();
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDuration(days);
    };

    return (
        <>
            <LinkCssJs_Admin onLoaded={() => setResourcesLoaded(true)}/>

            {resourcesLoaded && (
                <>
                    <NavAdmin/>
                    {/* <body class="fixed-nav sticky-footer bg-dark" id="page-top"> */}

                    <div class="content-wrapper">
                        <div class="container-fluid">
                            {/* Breadcrumbs */}
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="#">Dashboard</a>
                                </li>
                                <li class="breadcrumb-item active">My Dashboard</li>
                            </ol>

                            <form className='form-tao-tour' action="" method="get">
                                <h1>TẠO TOUR</h1>

                                <div className="ttcb">

                                    <div className="ttcbTrai">
                                        <div className="form-row">
                                            <p>Mã tour</p>
                                            <input type="text" name="matour"/>
                                        </div>

                                        <div className="form-row">
                                            <p>Tên tour</p>
                                            <input type="text" name="tentour"/>
                                        </div>
                                    </div>

                                    <div className="ttcbPhai">
                                        <div className="form-row">
                                            <p>Điểm đi:</p>
                                            <select name="diemdi">
                                                <option value="">Chọn nơi đi</option>
                                                <option value="tphcm">TP.Hồ Chí Minh</option>
                                                <option value="bentre">Bến Tre</option>
                                                <option value="dalat">Đà Lạt</option>
                                                <option value="vungtau">Vũng Tàu</option>
                                                <option value="phanthiet">Phan Thiết</option>
                                            </select>
                                        </div>

                                        <div className="form-row">
                                            <p>Điểm đến:</p>
                                            <select name="diemden">
                                                <option value="">Chọn nơi đến</option>
                                                <option value="tphcm">TP.Hồ Chí Minh</option>
                                                <option value="bentre">Bến Tre</option>
                                                <option value="dalat">Đà Lạt</option>
                                                <option value="vungtau">Vũng Tàu</option>
                                                <option value="phanthiet">Phan Thiết</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="form-row">
                                    <p>Loại tour</p>
                                    <select name="loaitour">
                                        <option value="">Chọn loại tour</option>
                                        <option value="nghiduong">Nghỉ dưỡng</option>
                                        <option value="dulich">Du lịch</option>
                                    </select>
                                </div>

                                <div className="form-row">
                                    <p>Hình đại diện</p>
                                    <input type="file" name="hinhdaidien"/>
                                </div>

                                <div className="form-row">
                                    <p>Album hình</p>
                                    <input type="file" name="albumhinh" multiple/>
                                </div>

                                <div className="form-row motangan">
                                    <p>Mô tả ngắn</p>
                                    <textarea style={{width: "300px", height: "100px"}} name="motangan" maxLength="200"></textarea>
                                </div>

                                <div className="form-row motachitiet">
                                    <p>Mô tả chi tiết</p>
                                    <textarea style={{width: "700px", height: "300px"}} name="motachitiet" maxLength="200"></textarea>
                                </div>

                                <div className="tour-duration">
                                    <div className="form-to-date">
                                        <div className="form-row">
                                            <p>Đi từ ngày</p>
                                            <Flatpickr
                                                value={ngayDi}
                                                onChange={([date]) => {
                                                    setNgayDi(date);
                                                    setNgayVe(null);  // reset ngày về nếu cần
                                                    setDuration(0);
                                                }}
                                                options={{
                                                    minDate: "today", // không chọn quá khứ
                                                    dateFormat: "Y-m-d",
                                                    altInput: true,
                                                    altFormat: "d/m/Y",
                                                }}
                                            />
                                        </div>

                                        <div className="form-row">
                                            <p>Đến ngày</p>
                                            <Flatpickr
                                                value={ngayVe}
                                                onChange={([date]) => {
                                                    setNgayVe(date),
                                                    calcDuration(ngayDi, date);
                                                }}
                                                options={{
                                                    minDate: ngayDi ? addOneDay(ngayDi) : "today",
                                                    dateFormat: "Y-m-d",
                                                    altInput: true,
                                                    altFormat: "d/m/Y",
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row" style={{ marginLeft: "40px" }}>
                                        <p>Thời lượng:</p>
                                        <p>{duration > 0 ? `${duration} ngày` : ""}</p>
                                    </div>
                                    
                                </div>

                                <div className="gia-ve" style={{marginTop: "20px"}}>
                                    <p>Giá vé</p>
                                    
                                    <div className="loai-ve">
                                        <div className="form-row">
                                            <p>Người lớn:</p>
                                            <input type="number" name="giavenguoilon" style={{ width: "100px" }}/> VNĐ
                                        </div>
                                        <div className="form-row">
                                            <p>Trẻ em:</p>
                                            <input type="number" name="giavetreem" style={{ width: "100px" }}/> VNĐ
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <p>Số lượng:</p>
                                    <input type="number" name="soluong"/>
                                </div>

                                <div className="btn-submit">
                                    <input type="submit" value="Tạo"/>
                                </div>

                                <br/>
                                
                            </form>
                        </div>
                    </div>

                    {/* </body> */}

                </>
            )}
        
        </>
    )
}

export default AddTour;