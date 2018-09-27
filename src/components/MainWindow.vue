<template>
  <div>
    <div id="loading-img" :style="{ display: displayLoadingImage }"></div>
    <nav class="blue lighten-1">
        <div class="nav-wrapper">
            <a class="brand-logo center">Dropblocks - Private Blockchain</a>
        </div>
    </nav>
    <div class="container overlay" :style="{ opacity: opacity }">
        <form id="app" @submit.prevent="installDropblocks">
            <div class="section">
                <div class="row">
                    <div class="col s12">
                        <h5>Multichain</h5>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s6">
                        <input v-model="multichainNetworkPortModel" :placeholder="`Network Port (Default: ${multichainNetworkPort})`" id="multichainNetworkPort" type="text" class="validate" required>
                        <label class="active" for="multichainNetworkPort">Network Port</label>
                        <span class="helper-text error" v-if="!$v.multichainNetworkPortModel.required" >
                            Field is required
                        </span>
                        <span class="helper-text error" v-if="!$v.multichainNetworkPortModel.between" >
                            Network Port must be between 
                            {{$v.multichainNetworkPortModel.$params.between.min}} and 
                            {{$v.multichainNetworkPortModel.$params.between.max}}  
                        </span>
                    </div>

                    <div class="input-field col s6">
                        <input v-model="multichainRPCPortModel" :placeholder="`Network Port (Default: ${multichainRPCPort})`" id="multichainRPCPort" type="text" class="validate" required>
                        <label class="active" for="multichainRPCPort">RPC Port</label>
                        <span class="helper-text error" v-if="!$v.multichainRPCPortModel.required" >
                            Field is required
                        </span>
                        <span class="helper-text error" v-if="!$v.multichainRPCPortModel.between" >
                            RPC Port must be between 
                            {{$v.multichainRPCPortModel.$params.between.min}} and 
                            {{$v.multichainRPCPortModel.$params.between.max}}  
                        </span>
                    </div>

                </div>
            </div>
            <div class="section">
                <div class="row">
                    <div class="col s12">
                        <h5>IPFS</h5>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s6">
                        <input v-model="ipfsGatewayPortModel" :placeholder="`Gateway Port (Default: ${ipfsGatewayPort})`" id="ipfsGatewayPort" type="text" class="validate" required>
                        <label class="active" for="ipfsGatewayPort">Gateway Port</label>
                        <span class="helper-text error" v-if="!$v.ipfsGatewayPortModel.required" >
                            Field is required
                        </span>
                        <span class="helper-text error" v-if="!$v.ipfsGatewayPortModel.between" >
                            Gateway Port must be between 
                            {{$v.ipfsGatewayPortModel.$params.between.min}} and 
                            {{$v.ipfsGatewayPortModel.$params.between.max}}  
                        </span>
                    </div>
                    <div class="input-field col s6">
                        <input v-model="ipfsApiPortModel" :placeholder="`API Port (Default: ${ipfsApiPort})`" id="ipfsApiPort" type="text" class="validate" required>
                        <label class="active" for="ipfsApiPort">API Port</label>
                        <span class="helper-text error" v-if="!$v.ipfsApiPortModel.required" >
                            Field is required
                        </span>
                        <span class="helper-text error" v-if="!$v.ipfsApiPortModel.between" >
                            API Port must be between 
                            {{$v.ipfsApiPortModel.$params.between.min}} and 
                            {{$v.ipfsApiPortModel.$params.between.max}}  
                        </span>
                    </div>
                    <div class="input-field col s6">
                        <input v-model="ipfsSwarmPortModel" :placeholder="`Network Port (Default: ${ipfsSwarmPort})`" id="ipfsSwarmPort" type="text" class="validate" required>
                        <label class="active" for="ipfsSwarmPort">Network Port</label>
                        <span class="helper-text error" v-if="!$v.ipfsSwarmPortModel.required" >
                            Field is required
                        </span>
                        <span class="helper-text error" v-if="!$v.ipfsSwarmPortModel.between" >
                            Network Port must be between 
                            {{$v.ipfsSwarmPortModel.$params.between.min}} and 
                            {{$v.ipfsSwarmPortModel.$params.between.max}}  
                        </span>
                    </div>
                </div>

                <div class="row">
                    <div class="col s6 offset-s6">
                        <button type="submit" class="btn waves-effect waves-light right" name="">INSTALL
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                    <div class="col s6 offset-s6">
                        <p class="error right" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                    </div>
                </div>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
import InstallerService from '@/services/InstallerService'
import {mapGetters} from 'vuex'
import { required, between} from 'vuelidate/lib/validators'
import { ipcRenderer } from 'electron'

export default {
  props: {
    
  },
  computed: {
    inputValidator () {
        return this.$store.state.inputValidator
    }
  },
  data () {
    return {
        /*
        * start multichain
        */ 

        // default port
        multichainNetworkPort: process.env.VUE_APP_MULTICHAIN_NETWORK_PORT,
        multichainRPCPort: process.env.VUE_APP_MULTICHAIN_RPC_PORT,

        // model input
        multichainNetworkPortModel: process.env.VUE_APP_MULTICHAIN_NETWORK_PORT,
        multichainRPCPortModel: process.env.VUE_APP_MULTICHAIN_RPC_PORT,
        /*
        * end multichain
        */ 

        /*
        * start ipfs
        */ 

        // default port
        ipfsGatewayPort: process.env.VUE_APP_IPFS_GATEWAY_PORT,
        ipfsApiPort: process.env.VUE_APP_IPFS_API_PORT,
        ipfsSwarmPort: process.env.VUE_APP_IPFS_SWARM_PORT,

        // model input
        ipfsGatewayPortModel: process.env.VUE_APP_IPFS_GATEWAY_PORT,
        ipfsApiPortModel: process.env.VUE_APP_IPFS_API_PORT,
        ipfsSwarmPortModel: process.env.VUE_APP_IPFS_SWARM_PORT,

        /*
        * end ipfs
        */

        loading: false,
        submitStatus: null,

        /*
        * Start Style
        */
        opacity: 1,
        displayLoadingImage: 'none',
        /*
        * End Style
        */
    }
  },
  validations: {
      ipfsGatewayPortModel: {
        required,
        between: between(1, 9999)  
      },
      ipfsApiPortModel: {
        required,
        between: between(1, 9999)  
      },
      ipfsSwarmPortModel: {
        required,
        between: between(1, 9999)  
      },
      multichainNetworkPortModel: {
        required,
        between: between(1, 9999)  
      },
      multichainRPCPortModel: {
        required,
        between: between(1, 9999)  
      },
  },
  methods: {
      async installDropblocks (e) {
        this.opacity = 0.4,
        this.displayLoadingImage = 'block'
        try{
            this.$v.$touch()
            if(this.$v.$invalid) {
                
                this.submitStatus = 'ERROR'
            } else {
                // validate the input
            
                // set ipfs port config
                const setIpfsPort = await InstallerService.setConfigIpfs(
                    this.ipfsApiPortModel, 
                    this.ipfsGatewayPortModel, 
                    this.ipfsSwarmPortModel
                )

                // set multichain port config
                const setMultichainPort = await InstallerService.setConfigMultichain(
                    this.multichainNetworkPort,
                    this.multichainRPCPort
                )
                
                alert('Port Settings have been successfull')
                ipcRenderer.send('settings-port:success')
            }
            

        } catch(err) {
            console.log(err)
        } finally {
            setTimeout(() => {
                this.opacity = 1
                this.displayLoadingImage = 'none'
            }, 1000);
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  color: white
}*/

.error {
    color:red
}
</style>
