import numpy as np
import torch

# --- Part 1: Tensor Basics ---

print("--- Part 1: Tensor Basics ---")

# 1.1 Creating Tensors
# From Python list
data = [[1, 2], [3, 4]]
x_data = torch.tensor(data)
print(f"Tensor from list:\n{x_data}\n")


np_array = np.array(data)
x_np = torch.from_numpy(np_array)
print(f"Tensor from NumPy array:\n{x_np}\n")

# Tensors with specific data types
x_float = torch.tensor([[1.0, 2.0], [3.0, 4.0]], dtype=torch.float32)
print(f"Float tensor:\n{x_float}\n")

# Tensors with random or zero/one values
x_rand = torch.rand(2, 3)  # 2 rows, 3 columns, random values between 0 and 1
x_zeros = torch.zeros(2, 2)
x_ones = torch.ones(3, 3)
print(f"Random tensor (2x3):\n{x_rand}\n")
print(f"Zeros tensor (2x2):\n{x_zeros}\n")
print(f"Ones tensor (3x3):\n{x_ones}\n")

# 1.2 Tensor Attributes
print(f"Shape of x_data: {x_data.shape}")
print(f"Data type of x_data: {x_data.dtype}")
print(
    f"Device of x_data: {x_data.device}\n"
)  # 'cpu' by default, 'cuda' if GPU is available and enabled

# 1.3 Tensor Operations
tensor = torch.ones(4, 4)
print(f"Original tensor:\n{tensor}\n")

# Addition
print(f"Tensor + 5:\n{tensor + 5}\n")
print(f"Tensor addition with another tensor:\n{tensor + tensor}\n")

# Multiplication
print(f"Tensor * 2:\n{tensor * 2}\n")
print(f"Element-wise multiplication:\n{tensor * tensor}\n")  # Hadamard product
print(
    f"Matrix multiplication (dot product):\n{tensor.matmul(tensor.T)}\n"
)  # .T for transpose

# Slicing/Indexing
print(f"First row: {tensor[0]}\n")
print(f"First column: {tensor[:, 0]}\n")
print(f"Element at [0, 1]: {tensor[0, 1]}\n")

# Reshaping
y = torch.ones(4)  # 1D tensor
z = y.view(2, 2)  # Reshape to 2x2
print(f"Original 1D tensor (y):\n{y}\n")
print(f"Reshaped 2D tensor (z):\n{z}\n")

# --- Part 2: Autograd (Automatic Differentiation) ---

print("\n--- Part 2: Autograd (Automatic Differentiation) ---")

# Autograd is crucial for training neural networks.
# It tracks operations on tensors and automatically computes gradients.

# Tensors for which we want to compute gradients must have requires_grad=True
x = torch.tensor(2.0, requires_grad=True)
y = torch.tensor(3.0, requires_grad=True)

# Define a simple computation graph
# f(x, y) = (x^2 + y)^2 + 3y
z = x**2 + y
f = z**2 + 3 * y

print(f"x = {x}, y = {y}")
print(
    f"z = x^2 + y = {z.item()}"
)  # .item() gets the Python number from a single-element tensor
print(f"f = z^2 + 3y = {f.item()}\n")

# Perform backward pass to compute gradients
# This calculates df/dx and df/dy
f.backward()

# Access the gradients
# df/dx = d/dx((x^2 + y)^2 + 3y) = 2*(x^2 + y)*(2x) = 4x*(x^2 + y)
# At x=2, y=3: df/dx = 4*2*(2^2 + 3) = 8*(4 + 3) = 8*7 = 56
print(f"Gradient of f with respect to x (df/dx): {x.grad}\n")

# df/dy = d/dy((x^2 + y)^2 + 3y) = 2*(x^2 + y)*(1) + 3 = 2*(x^2 + y) + 3
# At x=2, y=3: df/dy = 2*(2^2 + 3) + 3 = 2*(4 + 3) + 3 = 2*7 + 3 = 14 + 3 = 17
print(f"Gradient of f with respect to y (df/dy): {y.grad}\n")

# Another example: No gradient for tensor without requires_grad=True
a = torch.tensor(5.0)  # By default, requires_grad=False
b = torch.tensor(2.0, requires_grad=True)
c = a * b
# c.backward() # This would raise an error because 'a' doesn't require gradients and 'c' depends on it.
print(f"Tensor 'a' requires_grad: {a.requires_grad}")
print(f"Tensor 'b' requires_grad: {b.requires_grad}")
print(
    f"Tensor 'c' requires_grad: {c.requires_grad}\n"
)  # c inherits requires_grad=True from b

# You can stop autograd from tracking history with torch.no_grad()
print("--- Using torch.no_grad() ---")
with torch.no_grad():
    x_no_grad = torch.tensor(
        10.0, requires_grad=True
    )  # Still created with requires_grad=True
    y_no_grad = x_no_grad * 2
    print(f"x_no_grad requires_grad: {x_no_grad.requires_grad}")
    print(
        f"y_no_grad requires_grad inside no_grad block: {y_no_grad.requires_grad}"
    )  # False!

# This is useful during evaluation or inference when you don't need gradients
# to save memory and computation.
