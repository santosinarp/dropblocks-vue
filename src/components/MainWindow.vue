<template>
  <div class="mainWindow">
    <nav class="blue lighten-1">
        <div class="nav-wrapper">
            <a class="brand-logo center">BTM - Private Blockchain</a>
        </div>
    </nav>
    <div class="container">
        <div class="section">
            <div class="row">
                <div class="col s12">
                    <h5>Multichain</h5>
                </div>
            </div>

            <div class="row">
                <div class="input-field col s6">
                    <input v-model="multichainNetworkPortModel" :placeholder="`Network Port (Default: ${multichainNetworkPort})`" id="multichainNetworkPort" type="text" class="validate">
                    <label for="multichainNetworkPort">Network Port</label>
                </div>
                <div class="input-field col s6">
                    <input v-model="multichainRPCPortModel" :placeholder="`Network Port (Default: ${multichainRPCPort})`" id="multichainRPCPort" type="text" class="validate">
                    <label for="multichainRPCPort">RPC Port</label>
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
                    <input v-model="ipfsGatewayPortModel" :placeholder="`Gateway Port (Default: ${ipfsGatewayPort})`" id="ipfsGatewayPort" type="text" class="validate">
                    <label for="ipfsGatewayPort">Gateway Port</label>
                </div>
                <div class="input-field col s6">
                    <input v-model="ipfsApiPortModel" :placeholder="`API Port (Default: ${ipfsApiPort})`" id="ipfsApiPort" type="text" class="validate">
                    <label for="ipfsApiPort">API Port</label>
                </div>
                <div class="input-field col s6">
                    <input v-model="ipfsSwarmPortModel" :placeholder="`Network Port (Default: ${ipfsSwarmPort})`" id="ipfsSwarmPort" type="text" class="validate">
                    <label for="ipfsSwarmPort">Network Port</label>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainWindow',
  props: {
    msg: String
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
        ipfsSwarmPortModel: process.env.VUE_APP_IPFS_SWARM_PORT

        /*
        * end ipfs
        */
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
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
  /* color: #42b983; */
  color: white
}
</style>
