import React from "react";
import "./UserWallet.scss";
import Navbar from "../../common/Navbar/Navbar";

const UserWallet = () => {
  return (
    <div class="wallet-cont">
      <div class="header">
        <Navbar></Navbar>
      </div>
      <div class="user-wallet-content">
        <div class="user-wallet-content-row1">
          <div class="user-wallet-content-row1-col1">
            <div class="total-balance">
              <div class="total-balance-text">Total Balance VND</div>
              <div class="total-balance-number">9,999,999 vnd</div>
            </div>
            <div class="total-balance-input-parent">
              <div class="total-balance-input-parent-icon">
                <i class="fa-solid fa-file-invoice-dollar"></i>
              </div>
              <input
                class="total-balance-input"
                type="number"
                min="10000"
                step="10000"
              />
              <div class="vnd">VND</div>
            </div>
            <button class="top-up-btn">Top Up</button>
          </div>
          <div class="user-wallet-content-row1-col2">
            <div class="recharge-package">
              <div class="package1">1,000,000</div>
              <div class="package2">5,000,000</div>
            </div>
            <div class="recharge-package">
              <div class="package3">10,000,000</div>
              <div class="package4">15,000,000</div>
            </div>
          </div>
        </div>
        <div class="user-wallet-content-row2">
          <table class="table-transaction-history">
            <tr>
              <th>No</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Auction Date</th>
              <th>Description</th>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>10000</td>
              <td>YYYY/MM/DD hh:mm:ss</td>
              <td>Nạp tiền vào tài khoản</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>10000</td>
              <td>YYYY/MM/DD hh:mm:ss</td>
              <td>Nạp tiền vào tài khoản</td>
            </tr>
          </table>
        </div>
      </div>
      <footer class="footer">
        <div class="logo-footer">
          <img
            class="logo-img-footer"
            src="../../assets/images/logo_png.png"
            alt=""
          />
          <div class="name-project-footer">Nishikigoi Nexus</div>
        </div>
        <div class="social-contact">
          <div class="instagram">
            <img src="../../assets/images/Instagram.svg" alt="" />
          </div>
          <div class="facebook">
            <img src="../../assets/images/Social Icons (1).svg" alt="" />
          </div>
          <div class="google">
            <img src="../../assets/images/Vector.svg" alt="" />
          </div>
        </div>
        <div class="nav-bar-footer">
          <a href="#">Home</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
          <a href="#">About</a>
        </div>
      </footer>
    </div>
  );
};

export default UserWallet;
