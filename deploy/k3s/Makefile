add-rabbitmq-operator:
	kubectl apply -f "https://github.com/rabbitmq/cluster-operator/releases/latest/download/cluster-operator.yml"

install-rabbit-mq:
	kubectl apply -f eovrabbit.yaml

install-k3s:
	mkdir -p ~/k3s && cd ~/k3s
	curl -sfL https://get.k3s.io | sh -
	mkdir ~/.kube
	sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/k3s.yaml
	sudo chown ubuntu:ubuntu ~/.kube/k3s.yaml
	KUBECONFIG=~/.kube/config:~/.kube/k3s.yaml kubectl config view --flatten > /tmp/config
	cp /tmp/config ~/.kube/config
	export KUBECONFIG=~/.kube/config
install-helm:
	sudo snap install helm
install-istio:
	#curl -L https://istio.io/downloadIstio | sh -
	#export PATH=${PWD}/istio-1.18.0/bin:${PATH}
	istioctl install -y
create-nodeport-workaround:
	export INGRESS_PORT=$(kubectl -n "${INGRESS_NS}" get service "${INGRESS_NAME}" -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')
	export SECURE_INGRESS_PORT=$(kubectl -n "${INGRESS_NS}" get service "${INGRESS_NAME}" -o jsonpath='{.spec.ports[?(@.name=="https")].nodePort}')
	export TCP_INGRESS_PORT=$(kubectl -n "${INGRESS_NS}" get service "${INGRESS_NAME}" -o jsonpath='{.spec.ports[?(@.name=="tcp")].nodePort}')
create-istio-gateway:
	kubectl apply -f eovistiogateway.yaml 
	kubectl apply -f eovistiogatewaytraffic.yaml
        
