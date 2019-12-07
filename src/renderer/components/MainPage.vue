<template>
  <div id="wrapper">
    <div class="card">
      <b>서버 정보</b>
      <div class="right-area">
        <div id="control" :class="start ? 'toggle checked' : 'toggle'"></div>
        <label for="control" @click="toggle"></label>
      </div>
      <div class="content">
        서버 상태
        <div class="right-area" :class="start ? 'on' : 'off'">
          {{ start ? '실행 중' : '종료 됨' }}
          <fa-icon icon="circle"/>
        </div>
      </div>
      <div class="content">
        서버 URL
        <div class="right-area">
          <transition name="fade" mode="out-in">
            <fa-icon icon="caret-down" v-if="start"/>
            <fa-icon icon="times" v-else/>
          </transition>
        </div>
        <div class="hidden-content" v-show="port && start">
          <div class="ip-area" v-if="port">
            <div class="right-area" @click="open('http://localhost' + (port === 80 ? '' : ':' + port))">
              http://localhost{{ port === 80 ? '' : ':' + port }}
            </div>
          </div>
          <div class="ip-area" v-if="port">
            <div class="right-area" @click="open('http://127.0.0.1' + (port === 80 ? '' : ':' + port))">
              http://127.0.0.1{{ port === 80 ? '' : ':' + port }}
            </div>
          </div>
          <div class="ip-area" v-if="$store.state.ip !== '127.0.0.1' && port">
            <div class="right-area" @click="open('http://' + (port === 80 ? $store.state.ip : $store.state.ip + ':' + port))">
              http://{{ port === 80 ? $store.state.ip : $store.state.ip + ':' + port }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-button">
    </div>
    <div class="card">
      <b>기본 설정</b>
      <div class="content">
        <button class="button default" @click="chooseDirectory" :disabled="start">서버 디렉토리 선택</button>
      </div>
      <div class="content" style="font-size: 14px; margin-bottom: 25px;">
        <div>{{ dir ? dir : '-' }}</div>
      </div>
      <div class="content">
        포트
        <div class="right-area" style="margin-top: 0px;">
          <input class="input" type="number" min="1" max="65535" placeholder="포트" v-model.number="$store.state.port" :disabled="start">
        </div>
      </div>
      <div class="content">
        홈 파일 명
        <div class="right-area" style="margin-top: 0px;">
          <input type="text" class="input" placeholder="/" v-model.trim="$store.state.root" :disabled="start">
        </div>
      </div>
    </div>
    <div class="card">
      <b class="hover-info">
        고급 설정
        <div class="text">서버를 재시작해야 적용됩니다</div>
      </b>
      <div class="content hover-info">
        CORS 헤더 설정
        <div class="right-area">
          <div :class="$store.state.cors ? 'toggle checked' : 'toggle'"></div>
          <label style="margin: 0px;" @click="$store.commit('SET_CORS', !$store.state.cors)"></label>
        </div>
        <div class="text">다른 도메인으로 부터 HTTP 요청을 허용합니다</div>
      </div>
       <div class="content hover-info">
        심플 API 기능
        <div class="right-area">
          <div :class="$store.state.api ? 'toggle checked' : 'toggle'"></div>
          <label style="margin: 0px;" @click="$store.commit('SET_API', !$store.state.api)"></label>
        </div>
        <div :class="['collapse', 'custom', { 'hidden': !$store.state.api }]">
          <div class="sub-content" v-for="(api, i) in $store.state.apiList" :key="i">
            <button class="button default" @click="selectJsonFile(i)" :disabled="start">JSON 파일 선택</button>
            <div class="right-area" style="margin-top: 0px;">
              GET /api<input type="text" class="input" placeholder="/example" v-model.trim="$store.state.apiList[i].path" :disabled="start">
            </div>
            <div class="sub-text">{{ $store.state.apiList[i].file || '-' }}</div>
          </div>
          <div class="right-area" style="height: 30px;">
            <button class="button red" @click="removeApi" :disabled="start">
              <fa-icon icon="minus"/>
            </button>
            <button class="button green" @click="addApi" :disabled="start">
              <fa-icon icon="plus"/>
            </button>
          </div>
        </div>
        <div class="text">지정한 JSON 데이터를 응답합니다</div>
      </div>
      <div class="content hover-info">
        사용자 정의 라우팅
        <div class="right-area">
          <div :class="$store.state.custom ? 'toggle checked' : 'toggle'"></div>
          <label style="margin: 0px;" @click="$store.commit('SET_CUSTOM', !$store.state.custom)"></label>
        </div>
        <div :class="['collapse', 'custom', { 'hidden': !$store.state.custom }]">
          <div class="sub-content">
            <b>HTTP Method</b>
            <div class="right-area" style="margin-top: 0px;">
              <select v-model="$store.state.customMethod" :disabled="start">
                <option value="get">GET</option>
                <option value="post">POST</option>
                <option value="put">PUT</option>
                <option value="delete">DELETE</option>
              </select>
            </div>
          </div>
          <div class="sub-content">
            <b>Content-type</b>
            <div class="right-area" style="margin-top: 0px;">
              <select v-model="$store.state.customType" :disabled="start">
                <option value="text/plain">text/plain</option>
                <option value="text/html">text/html</option>
                <option value="application/json">application/json</option>
                <option value="application/xml">application/xml</option>
              </select>
            </div>
          </div>
          <div class="sub-content">
            <b>Path</b>
            <div class="right-area" style="margin-top: 0px;">
              <input class="input" type="text" min="1" max="10" placeholder="/example" v-model.trim="$store.state.customPath" :disabled="start">
            </div>
          </div>
          <div class="sub-content">
            <b>Data</b>
            <br>
            <textarea :placeholder="$store.state.customType + ' data'" v-model.trim="$store.state.customData" :disabled="start"></textarea>
          </div>
        </div>
        <div class="text">지정한 데이터를 응답합니다</div>
      </div>
    </div>
  </div>
</template>

<script>

const fs = require('fs')

export default {
  name: 'main-page',
  props: ['status'],
  computed: {
    start () {
      return this.$store.state.start
    },
    port () {
      return this.$store.state.port
    },
    dir () {
      return this.$store.state.dir
    }
  },
  methods: {
    toggle () {
      if (!this.$store.state.start) {
        if (!this.$store.state.dir) {
          this.$emit('alert', '서버 디렉토리를 선택해주세요')
          return
        }
        if (!this.$store.state.port) {
          this.$emit('alert', '포트를 입력해주세요')
          return
        }
        if (this.$store.state.api) {
          for (let apiInfo of this.$store.state.apiList) {
            if (!apiInfo.path || !apiInfo.file) {
              this.$emit('alert', 'JSON 파일 선택 또는 API 경로를 입력해주세요')
              return
            }
          }
        }
        if (this.$store.state.custom) {
          if (!this.$store.state.customPath) {
            this.$emit('alert', '사용자정의 라우팅 경로를 입력해주세요')
            return
          }

          if (!this.$store.state.customData) {
            this.$emit('alert', '사용자정의 데이터를 추가해주세요')
            return
          }

          if (this.$store.state.customType === 'application/json') {
            try {
              JSON.parse(this.$store.state.customData)
            } catch (e) {
              console.error(e)
              this.$emit('alert', 'JSON 데이터 형식을 확인해주세요')
              return
            }
          }
        }
        this.$emit('serverToggle')
      } else {
        this.$emit('serverToggle')
      }
    },
    chooseDirectory () {
      const dir = this.$electron.remote.dialog.showOpenDialog({
        properties: ['openDirectory'],
        title: '서버 디렉토리 선택'
      })

      if (dir) {
        fs.readdir(dir[0], (err, list) => {
          if (err) {
            this.$emit('alert', '디렉토리를 읽을 수 없습니다')
          } else {
            if (list.length === 0) {
              this.$emit('alert', '디렉토리가 비어있습니다')
            }
            // if (!list.some(el => el === 'index.html')) {
            //   this.$emit('alert', '디렉토리에 index.html이 없습니다')
            // }
            this.$store.commit('SET_DIRECTORY', dir[0])
          }
        })
      }
    },
    selectJsonFile (apiIndex) {
      const dir = this.$electron.remote.dialog.showOpenDialog({
        properties: ['openFile'],
        title: 'API 응답 데이터 선택',
        filters: [
          { name: 'JSON', extensions: ['json'] }
        ]
      })

      if (dir) {
        fs.readFile(dir[0], (err, data) => {
          if (err) {
            this.$emit('alert', '파일을 읽을 수 없습니다')
          } else {
            try {
              JSON.parse(data)
              this.$store.commit('SET_API_PATH', { index: apiIndex, file: dir[0] })
            } catch (e) {
              this.$emit('alert', 'JSON 데이터 형식을 확인해주세요')
            }
          }
        })
      }
    },
    removeApi () {
      if (this.$store.state.apiList.length === 1) {
        this.$emit('alert', 'API는 최소 1개가 존재해야 합니다')
        return
      }

      this.$store.commit('REMOVE_API')
    },
    addApi () {
      if (this.$store.state.apiList.length >= 10) {
        this.$emit('alert', 'API는 최대 10개 등록 가능합니다')
        return
      }

      this.$store.commit('ADD_API')
    },
    open (link) {
      console.log(link)
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style lang="scss">

@import "@/common.scss";

#wrapper {
  width: 100%;
  height: 100%;
  padding: 10px;
}

.on {
  color: $green;
  transition: $transition-duration;
}

.off {
  color: $red;
  transition: $transition-duration;
}

.hover-info {
  position: relative;

  .text {
    pointer-events: none;
    position: absolute;
    text-align: center;
    font-size: 0.85rem;
    font-weight: initial;
    bottom: -36px;
    width: 360px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 5px;
    box-sizing: border-box;
    border-radius: 8px;
    z-index: 9998;
    opacity: 0;
    visibility: hidden;
    transition: $transition-duration + 0.3;
  }

  &:hover .text {
    visibility: visible;
    opacity: 1;
  }
}

#advanced {
  position: relative;
  transition: $transition-duration;

  &:hover::before {
    content: "서버를 재시작해야 적용됩니다";
    text-align: center;
    position: absolute;
    font-weight: initial;
    bottom: -30px;
    width: 360px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 5px;
    box-sizing: border-box;
    border-radius: 8px;
    z-index: 9998;
  }
}

.sub-text {
  margin: 5px 0;
  color: #aaa;
  font-size: .8rem;
}

</style>
