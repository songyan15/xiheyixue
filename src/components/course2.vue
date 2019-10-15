<template>
    <div class="course">
        <ul class="media">
          <li>
            <router-link to="/vedioMenu">
              <img class="mediaImg" src="../assets/images/mingshi1.jpg" alt="">
              <div class="mediaContent">
                <h4 class="tit">考点精讲课</h4>
                <p class="info">深度讲解大纲内包含的考点知识，内容完整、准确，能够快速记住知识</p>
                <div class="footer">
                  已有2585人学习过
                </div>
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/simulation">
              <img class="mediaImg" src="../assets/images/mingshi2.jpg" alt="">
              <div class="mediaContent">
                <h4 class="tit">易混易错培训课</h4>
                <p class="info">详细讲解易混易错题，直接跳过错误答案，避免踩坑丢分。</p>
                <div class="footer">
                  已有712人学习过
                </div>
              </div>
            </router-link>
          </li>
          <li>
            <a href="">
              <img class="mediaImg" src="../assets/images/mingshi3.jpg" alt="">
              <div class="mediaContent">
                <h4 class="tit">重点案例精讲课</h4>
                <p class="info">案例历年占比大难拿分，针对案例题进行剖析讲解，提高案例得分</p>
                <div class="footer">
                  已有185人学习过
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="">
              <img class="mediaImg" src="../assets/images/mingshi4.jpg" alt="">
              <div class="mediaContent">
                <h4 class="tit">名师点题卷</h4>
                <p class="info">名师根据历年考题预测今年考点试题，点题试卷为考试标准试卷</p>
                <div class="footer">
                  已有354人学习过
                </div>
              </div>
            </a>
          </li>
        </ul>

    </div>
</template>

<script>
    export default {
        name: "course"
    }
</script>

<style lang="less" scoped>
  .course{
    .media{
      width: calc(~'100% - 20px');
      margin:10px;
      li{
        display: inline-block;
        width: 100%;
        margin-bottom: 10px;
        padding: 10px;
        background-color: #fff;
        border-radius: 4px;
        box-sizing: border-box;
      }
      .tit{
        width: 100%;
        text-overflow: ellipsis;/*这就是省略号喽*/
        overflow: hidden;/*设置超过的隐藏*/
        white-space: nowrap;/*设置不断行*/
      }
      .mediaImg{
        float: left;
        width: 60px;
        height: 60px;
        margin-right: 5px;
        border-radius: 50%;
      }
      .mediaContent{
        float: left;
        width: calc(~'100% - 85px');
        .tit{
          color:#000;
        }
        .info{
          color:#666;
          font-size: 13px;
        }
      }
      .footer{
        text-align: right;
        color:#666;
        font-size: 13px;
      }
    }
  }
</style>
