
const Home = () => {
  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Home</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active">Home</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <div className="info-box">
                  <span className="info-box-icon bg-primary elevation-1">
                    <i className="fas fa-cog"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">CPU Traffic</span>
                    <span className="info-box-number">
                      10<small>%</small>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box">
                  <span className="info-box-icon bg-danger elevation-1">
                    <i className="far fa-comment-alt"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Blogs</span>
                    <span className="info-box-number">41,410</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box">
                  <span className="info-box-icon bg-success elevation-1">
                    <i className="fas fa-shopping-cart"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Sales</span>
                    <span className="info-box-number">760</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box">
                  <span className="info-box-icon bg-info elevation-1">
                    <i className="fas fa-users"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">New Members</span>
                    <span className="info-box-number">2,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
