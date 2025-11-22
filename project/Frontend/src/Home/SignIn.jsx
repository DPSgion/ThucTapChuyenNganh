import { useState, useEffect } from 'react';
import Footer from './Footer';
import LinkCssJs from './LinkCssJs';

function SignIn() {
    const [resourcesLoaded, setResourcesLoaded] = useState(false);

    useEffect(() => {
        // Đợi resources load xong mới load script
        if (resourcesLoaded) {
            const script = document.createElement("script");
            script.src = "/js/sign-in.js";
            script.async = true;
            script.id = "sign-in-script"; // Thêm ID để dễ remove
            
            // Đảm bảo script chạy sau khi DOM đã render
            script.onload = () => {
                console.log("Sign-in script loaded");
            };
            
            document.body.appendChild(script);

            return () => {
                const existingScript = document.getElementById("sign-in-script");
                if (existingScript) {
                    document.body.removeChild(existingScript);
                }
            };
        }
    }, [resourcesLoaded]); // Chỉ chạy khi resourcesLoaded thay đổi

    return (
        <>
            <LinkCssJs onLoaded={() => setResourcesLoaded(true)} />

            {/* Loading indicator */}
            {!resourcesLoaded && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                }}>
                    <div style={{
                        fontSize: '24px',
                        color: '#333'
                    }}>Loading...</div>
                </div>
            )}

            {resourcesLoaded && (
                <section className="auth-section" style={{ backgroundImage: 'url(/images/bg_1.jpg)' }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-5">
                                <div className="auth-container">
                                    <div className="login-wrap">
                                        {/* Form Đăng Nhập */}
                                        <div id="login-form">
                                            <h3>Đăng Nhập</h3>
                                            <p className="subtitle">Chào mừng bạn quay trở lại</p>
                                            <form className="signin-form">
                                                <div className="form-group">
                                                    <label htmlFor="login-email" className="label">Email</label>
                                                    <div className="input-wrapper">
                                                        <input 
                                                            id="login-email" 
                                                            type="email" 
                                                            className="form-control" 
                                                            placeholder="example@email.com" 
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="login-password" className="label">Mật khẩu</label>
                                                    <div className="input-wrapper">
                                                        <input 
                                                            id="login-password" 
                                                            type="password" 
                                                            className="form-control" 
                                                            placeholder="Nhập mật khẩu" 
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <button type="submit" className="btn-primary">Đăng Nhập</button>
                                                </div>
                                                <div className="form-links">
                                                    <a href="#" id="forgot-password-link">Quên mật khẩu?</a>
                                                    <span className="divider">|</span>
                                                    <a href="#" id="register-link">Tạo tài khoản mới</a>
                                                </div>
                                            </form>
                                        </div>

                                        {/* Form Đăng Ký */}
                                        <div id="register-form" style={{ display: 'none' }}>
                                            <h3>Đăng Ký</h3>
                                            <p className="subtitle">Tạo tài khoản mới của bạn</p>
                                            <form className="signup-form">
                                                <div className="form-group">
                                                    <label htmlFor="register-name" className="label">Họ và tên</label>
                                                    <input 
                                                        id="register-name" 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="Nguyễn Văn A" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="register-email" className="label">Email</label>
                                                    <input 
                                                        id="register-email" 
                                                        type="email" 
                                                        className="form-control" 
                                                        placeholder="example@email.com" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="register-password" className="label">Mật khẩu</label>
                                                    <input 
                                                        id="register-password" 
                                                        type="password" 
                                                        className="form-control" 
                                                        placeholder="Tối thiểu 8 ký tự" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <button type="submit" className="btn-primary">Tạo Tài Khoản</button>
                                                </div>
                                                <div className="form-links">
                                                    <a href="#" id="login-link-from-register">Đã có tài khoản? Đăng nhập</a>
                                                </div>
                                            </form>
                                        </div>

                                        {/* Form Quên Mật Khẩu */}
                                        <div id="forgot-password-form" style={{ display: 'none' }}>
                                            <h3>Quên Mật Khẩu</h3>
                                            <p className="info-text">Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu</p>
                                            <form className="forgot-form">
                                                <div className="form-group">
                                                    <label htmlFor="forgot-email" className="label">Email</label>
                                                    <input 
                                                        id="forgot-email" 
                                                        type="email" 
                                                        className="form-control" 
                                                        placeholder="example@email.com" 
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <button type="submit" className="btn-primary">Gửi Yêu Cầu</button>
                                                </div>
                                                <div className="form-links">
                                                    <a href="#" id="login-link-from-forgot">Quay lại Đăng nhập</a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            )}
            <Footer/>
        </>
    );
}

export default SignIn;