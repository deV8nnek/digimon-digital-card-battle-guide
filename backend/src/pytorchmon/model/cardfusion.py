import torch.nn as nn


class CardFusionModel(nn.Module):

    def __init__(self):
        # Finding right model
        super(CardFusionModel, self).__init__()
        # each neuron -> function that returns a number from 0 to 1
        # number(300), type(6), lv (0 or 4=5) organize in vector
        self.input_output = nn.Linear(3, 300)  # no hidden
        # if 2D number image recognition is length x width or the number of pixels with values 0.0 black to 1.0 white
        # so input layer means regardless of values, in this case, 3 for number, type, lv
        # self.input = nn.Linear(3, 1) # 1 hidden, 1 neuron
        # ...
        # \- Activation
        # Sigmoid sig(w_n a_n + w_n1 a_n1 ... + b_n) ""S"" graph slow learning? # use case?
        # sigmoid (w_n a_n + w_n1 a_n1 ... as matrix * input vector + bias vector) squeeze? unsqueeze?
        # Sigmoid +- bias number may for each neuron organize in vector
        # ReLU(a) = max(0,a) or rectified linear unit ""_/"" graph most used
        # to test hypothesis, will do input layer 300+6+5
        # self.input = nn.Linear(365, 1) # 1/1 hidden/neuron
        # ....
        # rejected since there are weights already and if it is 300 then values could be only be 0 or 1 for true or false
        # which is memory unwise than having 1 neuron with 300 possible values
        # but- 0.0 black to 1.0 white makes sense in image recognition as pixels
        # curiosity optional unless the results need more tests
        # 300 (maybe number has more influence) + 1 + 1
        # rejected since above already do so

        # self.hidden1 = nn.Linear(1, 1) #1 neuron
        # self.hidden2 = nn.Linear(1, 1) #1 neuron
        # self.hidden3 = nn.Linear(1, 1) #1 neuron
        # ...

        # number(300)
        # self.output = nn.Linear(1, 300) # n neuron
        #
        # cost function
        # sum of (ouput vector - cost vector 1 for correct 0 for not)^2
        # sum is small is correct, large if incorrect
        # so average cost
        # input is weight and biases output 1 number (the cost)
        # or the minimum value dC / dw (w_n) = 0 but for one input
        # if slope is known, shift to left if positive, else right for negative
        # in a multi dimensional cos function, is the gradient descent or the direction of steepest increase
        # or delta -C(x, y)
        # which direction C(x, y) descreases most quickly
        # algorith that computes the gradient efficiently is backpropagation
        # -gradient descent of a cost function is what nudges of these wight and biases cause the fastest change that decrease the cost
        # vanilla convolutional neural network above

        # back propagation
        # average the sum of desired chanes

        # stochastic gradiant descent
        # instead of finding the gradient descent one path
        # find the gradient descent by batches of n training

        # init weight?

    def forward(self, x):
        n_layer = self.input_output(x)
        # n_layer = self.first_layer(x)
        # n_layer = self.final_layer(n_layer)
        return n_layer
